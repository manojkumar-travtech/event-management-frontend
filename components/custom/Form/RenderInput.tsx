import { useState } from "react";
import { FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";
import {
  castValueByType,
  getFieldError,
  sizeClasses,
  variantClasses,
} from "./FormHelper";
import { FormFieldProps, FormSize, FormVariant } from "./Formtypes.types";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// shadcn/ui imports
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RenderInput<T extends FieldValues>(
  field: FormFieldProps<T>,
  value: PathValue<T, Path<T>>,
  onChange: (value: PathValue<T, Path<T>>) => void,
  disabled: boolean,
  size: FormSize,
  variant: FormVariant,
  errors: FieldErrors<T>
) {
  console.log("errors", errors);
  const [showPassword, setShowPassword] = useState(false);

  const fieldSize = field.size || size;
  const fieldVariant = field.variant || variant;
  const fieldError = getFieldError(errors, field.name as Path<T>);

  console.log("fieldError", fieldError);

  const baseClasses = `
    w-full transition-colors duration-200 outline-none
    ${sizeClasses[fieldSize]}
    ${variantClasses[fieldVariant]}
    ${fieldError ? "border-red-500 focus-visible:ring-red-500" : ""}
    ${field.disabled || disabled ? "cursor-not-allowed opacity-60" : ""}
    ${field.readonly ? "bg-gray-50 cursor-default" : ""}
  `
    .trim()
    .replace(/\s+/g, " ");

  switch (field.type) {
    /* ---------- text-like inputs ---------- */
    case "text":
    case "email":
    case "number":
    case "date":
    case "datetime-local":
    case "tel":
    case "url":
    case "search":
      return (
        <div className="relative">
          {field.prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.prefix}
            </span>
          )}
          {field.icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {field.icon}
            </div>
          )}
          <Input
            type={field.type}
            className={`${baseClasses} ${field.icon ? "pl-10" : ""} ${
              field.prefix ? "pl-8" : ""
            } ${field.suffix ? "pr-8" : ""}`}
            disabled={field.disabled || disabled}
            readOnly={field.readonly}
            placeholder={field.placeholder}
            step={field.step}
            value={value ?? ""}
            onChange={(e) =>
              onChange(castValueByType<T>(field.type, e.target.value))
            }
          />
          {field.suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      );

    /* ---------- password ---------- */
    case "password":
      return (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={`${baseClasses} ${field.icon ? "pl-10" : ""} ${
              field.prefix ? "pl-8" : ""
            } pr-10`}
            disabled={field.disabled || disabled}
            readOnly={field.readonly}
            placeholder={field.placeholder}
            value={value ?? ""}
            onChange={(e) =>
              onChange(castValueByType<T>(field.type, e.target.value))
            }
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 cursor-pointer" />
            ) : (
              <EyeIcon className="h-5 w-5 cursor-pointer" />
            )}
          </button>
        </div>
      );

    /* ---------- textarea ---------- */
    case "textarea":
      return (
        <Textarea
          className={`${baseClasses} resize-vertical`}
          rows={field.rows || 4}
          disabled={field.disabled || disabled}
          readOnly={field.readonly}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );

    /* ---------- select ---------- */
    case "select":
      return (
        <Select
          value={value as string}
          onValueChange={(val) =>
            onChange(val as unknown as PathValue<T, Path<T>>)
          }
          disabled={field.disabled || disabled}
        >
          <SelectTrigger className={baseClasses}>
            <SelectValue
              placeholder={field.placeholder || "Select an option"}
            />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
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

    /* ---------- checkbox ---------- */
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            label={field.label}
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              onChange(castValueByType<T>("checkbox", checked))
            }
            disabled={field.disabled || disabled}
          />
          {/* <label className="text-sm">{field.label}</label> */}
        </div>
      );

    /* ---------- radio ---------- */
    case "radio":
      return (
        <RadioGroup
          value={value as string}
          onValueChange={(val) =>
            onChange(val as unknown as PathValue<T, Path<T>>)
          }
          disabled={field.disabled || disabled}
        >
          {field.options?.map((option) => (
            <div
              key={String(option.value)}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem
                value={String(option.value)}
                id={String(option.value)}
              />
              <label htmlFor={String(option.value)} className="text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      );

    /* ---------- file ---------- */
    case "file":
      return (
        <Input
          type="file"
          className={baseClasses}
          disabled={field.disabled || disabled}
          multiple={field.multiple}
          onChange={(e) => {
            const files = e.target.files;
            onChange(
              field.multiple
                ? (Array.from(files || []) as PathValue<T, Path<T>>)
                : ((files?.[0] || null) as PathValue<T, Path<T>>)
            );
          }}
        />
      );

    /* ---------- range ---------- */
    case "range":
      return (
        <div className="space-y-2">
          <Input
            type="range"
            className="w-full cursor-pointer"
            disabled={field.disabled || disabled}
            value={value ?? 0}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.step}
            onChange={(e) =>
              onChange(castValueByType<T>("range", e.target.value))
            }
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{field.validation?.min || 0}</span>
            <span className="font-medium">{value ?? 0}</span>
            <span>{field.validation?.max || 100}</span>
          </div>
        </div>
      );

    /* ---------- color ---------- */
    case "color":
      return (
        <Input
          type="color"
          className="h-10 w-20 cursor-pointer"
          disabled={field.disabled || disabled}
          value={(value as string) ?? "#000000"}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );

    /* ---------- multiselect (still native because shadcn Select doesn’t support multi) ---------- */
    case "multiselect":
      return (
        <select
          multiple
          className={`${baseClasses} pr-10`}
          value={Array.isArray(value) ? value : []}
          disabled={field.disabled || disabled}
          onChange={(e) => {
            const selectedValues = Array.from(
              e.target.selectedOptions,
              (o) => o.value
            );
            onChange(selectedValues as PathValue<T, Path<T>>);
          }}
        >
          {field.options?.map((option) => (
            <option
              key={String(option.value)}
              value={String(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
}

export default RenderInput;
