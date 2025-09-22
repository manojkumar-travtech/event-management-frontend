import { ReactNode } from "react";

export type BaseInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";
export type ExtendedInputType = "currency" | "card" | "select";
export type InputType = BaseInputType | ExtendedInputType;

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export type SelectOptions = SelectOption[] | string[];

export interface BaseInputProps {
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly helperText?: string;
  readonly id?: string;
  readonly name?: string;
}

export interface StandardInputProps extends BaseInputProps {
  readonly type?: BaseInputType;
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly icon?: ReactNode;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly pattern?: string;
  readonly autoComplete?: string;
  readonly readOnly?: boolean;
}

export interface PrefixSuffixInputProps extends BaseInputProps {
  readonly type: "currency" | "card";
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly icon?: ReactNode;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

export interface SelectInputProps extends BaseInputProps {
  readonly type: "select";
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly onValueChange?: (value: string) => void;
  readonly options: SelectOptions;
  readonly emptyOption?: string;
}

export type InputFieldProps =
  | StandardInputProps
  | PrefixSuffixInputProps
  | SelectInputProps;

export interface ValidationRule {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly email?: boolean;
  readonly url?: boolean;
  readonly custom?: (value: string) => string | undefined;
}

export interface FormFieldState {
  readonly value: string;
  readonly error?: string;
  readonly touched: boolean;
  readonly dirty: boolean;
}
