import { InputFieldProps, InputType, PrefixSuffixInputProps, SelectInputProps, SelectOption, SelectOptions, ValidationRule } from "./Input.types";

export const isSelectInput = (props: InputFieldProps): props is SelectInputProps => {
  return props.type === 'select';
};

export const isPrefixSuffixInput = (props: InputFieldProps): props is PrefixSuffixInputProps => {
  return props.type === 'currency' || props.type === 'card';
};

export const normalizeSelectOptions = (options: SelectOptions): SelectOption[] => {
  return options.map((option): SelectOption => 
    typeof option === 'string' 
      ? { value: option, label: option }
      : option
  );
};

export const getInputTypeForHTML = (type: InputType): string => {
  switch (type) {
    case 'currency':
      return 'number';
    case 'card':
      return 'text';
    default:
      return type;
  }
};

export const validateField = (value: string, rules: ValidationRule): string | undefined => {
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `Minimum ${rules.minLength} characters required`;
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `Maximum ${rules.maxLength} characters allowed`;
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (value && rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address';
  }

  if (value && rules.url && !/^https?:\/\/.+\..+/.test(value)) {
    return 'Please enter a valid URL';
  }

  if (value && rules.custom) {
    return rules.custom(value);
  }

  return undefined;
};