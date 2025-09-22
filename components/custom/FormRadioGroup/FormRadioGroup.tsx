"use client";

import * as React from "react";
import {
  RadioGroup as RadixRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Path, PathValue } from "react-hook-form";
import { FormFieldOption } from "../newForm/Formtypes.types";

interface FormRadioGroupProps<T> {
  label?: string;
  value: PathValue<T, Path<T>> | null | undefined | string;
  onChange: (val: PathValue<T, Path<T>>) => void;
  options: FormFieldOption[] | undefined;
  isDisabled?: boolean;
  hasError?: boolean;
  direction?: "vertical" | "horizontal"; // new prop
}

const FormRadioGroup = <T,>({
  label,
  value,
  onChange,
  options = [],
  isDisabled,
  hasError,
  direction = "vertical", // default vertical
}: FormRadioGroupProps<T>) => {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <RadixRadioGroup
        disabled={isDisabled}
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(val as PathValue<T, Path<T>>)}
        className={cn(
          direction === "vertical"
            ? "space-y-2"
            : "flex flex-wrap gap-4" // horizontal layout
        )}
      >
        {options.map((option) => (
          <div
            key={String(option.value)}
            className={cn(
              "flex items-start space-x-3",
              direction === "horizontal" && "items-center space-x-2"
            )}
          >
            <RadioGroupItem
              value={String(option.value)}
              id={`radio-${String(option.value)}`}
              disabled={option.disabled}
              className={cn("mt-1", hasError && "border-error-500")}
            />
            <div
              className={cn(
                "flex-1",
                direction === "horizontal"
                  ? "mt-0"
                  : "items-center justify-center mt-[-2px]"
              )}
            >
              <Label
                htmlFor={`radio-${String(option.value)}`}
                className="cursor-pointer"
              >
                {option.label}
              </Label>
              {option.description && (
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadixRadioGroup>
    </div>
  );
};

export default FormRadioGroup;
