"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Path, PathValue } from "react-hook-form";
import { FormFieldOption } from "../Form/Formtypes.types";

interface FormSelectProps<T> {
  value: PathValue<T, Path<T>> | null | undefined | string;
  onChange: (val: PathValue<T, Path<T>>) => void;
  options: FormFieldOption[] | undefined;
  placeholder?: string;
  isDisabled?: boolean;
  hasError?: boolean;
}

const SingleSelect = <T,>({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  isDisabled,
  hasError,
}: FormSelectProps<T>) => {
  return (
    <Select
      disabled={isDisabled}
      value={value !== undefined && value !== null ? String(value) : ""}
      onValueChange={(val) => onChange(val as PathValue<T, Path<T>>)}
    >
      <SelectTrigger className={cn(hasError && "border-error-500")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={String(option.value)}
            value={String(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// ✅ Explicitly cast to React.FC
export default SingleSelect as <T>(
  props: FormSelectProps<T>
) => ReturnType<React.FC<FormSelectProps<T>>>;
