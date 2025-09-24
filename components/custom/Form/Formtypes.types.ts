import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime-local"
  | "tel"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "file"
  | "range"
  | "color"
  | "custom";

export type FormLayout = "vertical" | "horizontal" | "inline" | "grid";
export type FormSize = "sm" | "md" | "lg";
export type FormVariant = "default" | "outlined" | "filled" | "minimal";

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface FormFieldValidation<T = FieldValues> {
  required?: boolean | string;
  pattern?: { value: RegExp; message: string };
  min?: number | string | undefined;
  max?: number | string | undefined;
  minLength?: number;
  maxLength?: number;
  validate?: (
    value: unknown,
    formValues: T
  ) => boolean | string | Promise<boolean | string>;
}

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  validation?: FormFieldValidation;
  options?: FormFieldOption[];
  rows?: number;
  disabled?: boolean;
  readonly?: boolean;
  helpText?: string;
  className?: string;
  style?: React.CSSProperties;
  colSpan?: number;
  size?: FormSize;
  variant?: FormVariant;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  step?: number;
  accept?: string;
  multiple?: boolean;
  render?: (props: {
    onChange: (value: unknown) => void;
    value: unknown;
    errors: FieldErrors<T>;
    control: Control<T>;
    fieldState: UseFormReturn<T>["formState"];
    field: Omit<FormFieldProps<T>, "render">;
  }) => React.ReactNode;
  conditional?: ConditionalRule;

}

export interface FormSection<T extends FieldValues> {
  title?: string;
  description?: string;
  fields: FormFieldProps<T>[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface FormConfig<T extends FieldValues> {
  title?: string;
  description?: string;
  sections?: FormSection<T>[];
  fields?: FormFieldProps<T>[];
  gridCols?: 1 | 2 | 3 | 4 | 6 | 12;
  fullWidthButtons?: boolean;
}

export interface DynamicFormProps<T extends FieldValues> {
  formConfig: FormConfig<T>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  submitButtonText?: string;
  defaultValues?: Partial<T>;
  layout?: FormLayout;
  size?: FormSize;
  variant?: FormVariant;
  className?: string;
  showErrors?: boolean;
  loading?: boolean;
  disabled?: boolean;
  requiredFormLayout?: boolean;
  externalSubmit?: boolean ; 
  ref?: React.Ref<DynamicFormRef<T>>
  onChange?: (values: T) => void
}

export interface RenderFieldsProps<T extends FieldValues> {
  fields: FormFieldProps<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  showErrors?: boolean;
  gridCols?: number;
  size: FormSize;
  variant: FormVariant;
  layout: FormLayout;
  isMobile:boolean
  watch?: (field?: string | string[], defaultValue?: any) => any;
}
export interface ConditionalRule {
  field: string;       // the field to watch
  value: any[];        // the values that trigger showing this field
}
export type DynamicFormRef<T extends FieldValues> = {
  submit: () => Promise<T | false>;
  validateSection?: (fields: string[]) => Promise<boolean>;
  getValues: () => T;
  reset: () => void;
  trigger?: (name?: string | string[]) => Promise<boolean>;
  isValid : boolean 
};
