import { Controller, FieldValues } from "react-hook-form";
import {
  getColSpanClass,
  getGridColsClass,
  getLayoutClasses,
  getValidationRules,
} from "./FormHelper";
import renderInput from "./RenderInput";
import { RenderFieldsProps } from "./Formtypes.types";
import { Label } from "@/components/ui/label";

// Helper function to get nested field errors
const getFieldError = (errors: any, fieldName: string) => {
    console.log('hhh' , errors)
  const fieldParts = fieldName.split(".");
  let error = errors;

  for (const part of fieldParts) {
    if (error && error[part]) {
      error = error[part];
    } else {
      return null;
    }
  }

  return error?.message ? error : null;
};

export const renderFields = <T extends FieldValues>({
  fields,
  control,
  errors,
  showErrors = true,
  gridCols,
  size,
  layout,
  variant,
  onFieldChange,
}: RenderFieldsProps<T> & {
  onFieldChange?: (name: string, value: any) => void;
}) => (
  <div
    className={`grid grid-cols-1 ${
      gridCols ? getGridColsClass(gridCols) : ""
    } gap-6`}
  >
    {fields.map((field) => (
      <div
        key={field.name}
        className={`${getLayoutClasses(layout)} ${
          field.colSpan ? getColSpanClass(field.colSpan) : ""
        } ${field.className || ""}`}
        style={field.style}
      >
        {field.type !== "checkbox" && field.type !== "radio" && (
          <Label htmlFor={field.name}>
            {field.label}
            {field.validation?.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </Label>
        )}

        <Controller
          name={field.name}
          control={control}
          rules={getValidationRules(field as any) as never}
          render={({ field: { onChange, value }, fieldState, formState }) => {
            // Get the specific field error
            const fieldError = getFieldError(errors, field.name);
            console.log("fieldError in render", fieldError);
            console.log('fieldState',fieldState)
            // Show error when field is touched OR when form is submitted
            const showError =
              showErrors &&
              fieldError &&
              (fieldState.isTouched || formState.isSubmitted);

            const handleChange = (val: any) => {
              onChange(val);
              onFieldChange?.(field.name, val);
            };

            return (
              <>
                {field.type === "custom" && field.render
                  ? field.render({
                      onChange: handleChange,
                      value,
                      errors,
                      control,
                      fieldState: formState,
                      field: { ...field },
                    })
                  : renderInput(
                      field,
                      value,
                      handleChange,
                      field.disabled ?? false,
                      size,
                      variant,
                      errors
                    )}

                {showError && (
                  <div className="mt-2 text-sm text-red-600 flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{fieldError.message}</span>
                  </div>
                )}

                {field.helpText && field.type !== "checkbox" && (
                  <p className="mt-2 text-sm text-gray-500">{field.helpText}</p>
                )}
              </>
            );
          }}
        />
      </div>
    ))}
  </div>
);
