import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import {
  getInputTypeForHTML,
  isSelectInput,
  normalizeSelectOptions,
} from "./InputHelpers";
import { Input } from "@/components/ui/input";
import {
  InputFieldProps,
  PrefixSuffixInputProps,
  SelectInputProps,
  StandardInputProps,
} from "./Input.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, DollarSign } from "lucide-react";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      className = "",
      required = false,
      disabled = false,
      error,
      helperText,
      id,
      name,
      ...restProps
    } = props;

    const renderIcon = (): ReactNode => {
      if ("icon" in props && props.icon) return props.icon;
      if (props.type === "currency")
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
      if (props.type === "card")
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
      return null;
    };

    const renderSelectInput = (selectProps: SelectInputProps): ReactNode => {
      const normalizedOptions = normalizeSelectOptions(selectProps.options);

      const handleValueChange = (value: string): void => {
        // Map back "__empty__" to ""
        const finalValue = value === "__empty__" ? "" : value;

        if (selectProps.onChange) {
          selectProps.onChange(finalValue);
        }
        if (selectProps.onValueChange) {
          selectProps.onValueChange(finalValue);
        }
      };

      return (
        <Select
          value={selectProps.value || ""}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              error && "border-destructive focus:ring-destructive"
            )}
            id={id}
          >
            <SelectValue placeholder={selectProps.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {selectProps.emptyOption && (
              <SelectItem value="__empty__">{selectProps.emptyOption}</SelectItem>
            )}
            {normalizedOptions.map((option, index) => (
              <SelectItem
                key={`${option.value}-${index}`}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    };

    const renderStandardInput = (
      inputProps: StandardInputProps | PrefixSuffixInputProps
    ): ReactNode => {
      const htmlType = getInputTypeForHTML(inputProps.type || "text");
      const icon = renderIcon();
      const hasPrefix = "prefix" in inputProps && inputProps.prefix;
      const hasSuffix = "suffix" in inputProps && inputProps.suffix;

      if (hasPrefix || hasSuffix || icon) {
        return (
          <div className="relative flex">
            {(hasPrefix || icon) && (
              <div className="flex items-center justify-center px-3 border border-r-0 border-input bg-muted/50 rounded-l-md">
                {icon || (
                  <span className="text-sm text-muted-foreground">
                    {"prefix" in inputProps ? inputProps.prefix : ""}
                  </span>
                )}
              </div>
            )}

            <Input
              ref={ref}
              id={id}
              name={name}
              type={htmlType}
              className={cn(
                (hasPrefix || icon) && "rounded-l-none border-l-0",
                hasSuffix && "rounded-r-none border-r-0",
                error && "border-destructive focus:ring-destructive"
              )}
              placeholder={inputProps.placeholder}
              value={inputProps.value || ""}
              onChange={inputProps.onChange}
              onBlur={inputProps.onBlur}
              onFocus={inputProps.onFocus}
              disabled={disabled}
              required={required}
              maxLength={
                "maxLength" in inputProps ? inputProps.maxLength : undefined
              }
              minLength={
                "minLength" in inputProps ? inputProps.minLength : undefined
              }
              min={"min" in inputProps ? inputProps.min : undefined}
              max={"max" in inputProps ? inputProps.max : undefined}
              step={"step" in inputProps ? inputProps.step : undefined}
              pattern={"pattern" in inputProps ? inputProps.pattern : undefined}
              autoComplete={
                "autoComplete" in inputProps
                  ? inputProps.autoComplete
                  : undefined
              }
              readOnly={
                "readOnly" in inputProps ? inputProps.readOnly : undefined
              }
            />

            {hasSuffix && (
              <div className="flex items-center justify-center px-3 border border-l-0 border-input bg-muted/50 rounded-r-md">
                <span className="text-sm text-muted-foreground">
                  {"suffix" in inputProps ? inputProps.suffix : ""}
                </span>
              </div>
            )}
          </div>
        );
      }

      return (
        <Input
          ref={ref}
          id={id}
          name={name}
          type={htmlType}
          className={cn(
            className,
            error && "border-destructive focus:ring-destructive"
          )}
          placeholder={inputProps.placeholder}
          value={inputProps.value || ""}
          onChange={inputProps.onChange}
          onBlur={inputProps.onBlur}
          onFocus={inputProps.onFocus}
          disabled={disabled}
          required={required}
          maxLength={
            "maxLength" in inputProps ? inputProps.maxLength : undefined
          }
          minLength={
            "minLength" in inputProps ? inputProps.minLength : undefined
          }
          min={"min" in inputProps ? inputProps.min : undefined}
          max={"max" in inputProps ? inputProps.max : undefined}
          step={"step" in inputProps ? inputProps.step : undefined}
          pattern={"pattern" in inputProps ? inputProps.pattern : undefined}
          autoComplete={
            "autoComplete" in inputProps ? inputProps.autoComplete : undefined
          }
          readOnly={"readOnly" in inputProps ? inputProps.readOnly : undefined}
        />
      );
    };

    const renderInput = (): ReactNode => {
      if (isSelectInput(props)) {
        return renderSelectInput(props as SelectInputProps);
      }
      return renderStandardInput(props);
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-destructive"
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}

        {renderInput()}

        {error && (
          <p
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
