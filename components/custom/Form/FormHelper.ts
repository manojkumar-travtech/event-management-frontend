// FormHelper.ts - Complete helper functions

import {
  FieldError,
  FieldErrors,
  FieldValues,
  get,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { FormSize, FormVariant } from "./Formtypes.types";

export interface FieldValidation {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: any;
  email?: boolean | string;
}

export interface FormField {
  name: string;
  type: string;
  label?: string;
  validation?: FieldValidation;
  disabled?: boolean;
  colSpan?: number;
  className?: string;
  style?: React.CSSProperties;
  helpText?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: any }>;
  render?: (props: any) => React.ReactNode;
  [key: string]: any;
}

export const getValidationRules = (field: FormField): RegisterOptions => {
  const rules: RegisterOptions = {};

  if (field.validation) {
    // Required validation
    if (field.validation.required) {
      if (typeof field.validation.required === "boolean") {
        rules.required = `${field.label || field.name} is required`;
      } else {
        rules.required = field.validation.required;
      }
    }

    // Email validation
    if (field.validation.email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (typeof field.validation.email === "boolean") {
        rules.pattern = {
          value: emailRegex,
          message: "Please enter a valid email address",
        };
      } else {
        rules.pattern = {
          value: emailRegex,
          message: field.validation.email,
        };
      }
    }

    // MinLength validation
    if (field.validation.minLength) {
      if (typeof field.validation.minLength === "number") {
        rules.minLength = {
          value: field.validation.minLength,
          message: `${field.label || field.name} must be at least ${
            field.validation.minLength
          } characters`,
        };
      } else {
        rules.minLength = field.validation.minLength;
      }
    }

    // MaxLength validation
    if (field.validation.maxLength) {
      if (typeof field.validation.maxLength === "number") {
        rules.maxLength = {
          value: field.validation.maxLength,
          message: `${field.label || field.name} must not exceed ${
            field.validation.maxLength
          } characters`,
        };
      } else {
        rules.maxLength = field.validation.maxLength;
      }
    }

    // Min value validation
    if (field.validation.min !== undefined) {
      if (typeof field.validation.min === "number") {
        rules.min = {
          value: field.validation.min,
          message: `${field.label || field.name} must be at least ${
            field.validation.min
          }`,
        };
      } else {
        rules.min = field.validation.min;
      }
    }

    // Max value validation
    if (field.validation.max !== undefined) {
      if (typeof field.validation.max === "number") {
        rules.max = {
          value: field.validation.max,
          message: `${field.label || field.name} must not exceed ${
            field.validation.max
          }`,
        };
      } else {
        rules.max = field.validation.max;
      }
    }

    // Pattern validation
    if (field.validation.pattern) {
      rules.pattern = field.validation.pattern;
    }

    // Custom validation
    if (field.validation.validate) {
      rules.validate = field.validation.validate;
    }
  }

  return rules;
};

export const getGridColsClass = (cols: number): string => {
  const gridClasses: { [key: number]: string } = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    12: "md:grid-cols-12",
  };
  return gridClasses[cols] || "md:grid-cols-1";
};

export const getColSpanClass = (span: number): string => {
  const spanClasses: { [key: number]: string } = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    9: "md:col-span-9",
    10: "md:col-span-10",
    11: "md:col-span-11",
    12: "md:col-span-12",
  };
  return spanClasses[span] || "md:col-span-1";
};

export const getLayoutClasses = (layout?: string): string => {
  switch (layout) {
    case "horizontal":
      return "flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0";
    case "inline":
      return "flex items-center space-x-4";
    case "vertical":
    default:
      return "flex flex-col space-y-2";
  }
};

export function castValueByType<T extends FieldValues>(
  type: string,
  rawValue: unknown
): PathValue<T, Path<T>> {
  switch (type) {
    case "number":
    case "range":
      return Number(rawValue) as PathValue<T, Path<T>>;
    case "checkbox":
      return Boolean(rawValue) as PathValue<T, Path<T>>;
    default:
      return rawValue as PathValue<T, Path<T>>;
  }
}

export const sizeClasses: Record<FormSize, string> = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
};

export const variantClasses: Record<FormVariant, string> = {
  default:
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  outlined:
    "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  filled:
    "border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  minimal:
    "border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0",
};

export function getFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>
): FieldError | undefined {
  return get(errors, name) as FieldError | undefined;
}
