"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { renderFields } from "./RenderFields";
import { DynamicFormProps } from "./Formtypes.types";
import { Button } from "@/components/ui/button";

export type DynamicFormRef<T extends FieldValues> = {
  submit: () => void;
  validateSection: (fields: string[]) => Promise<boolean>;
  getValues: () => T;
  reset: () => void;
  trigger: (name?: string | string[]) => Promise<boolean>;
};

type Props<T extends FieldValues> = DynamicFormProps<T> & {
  hideInternalSubmit?: boolean;
  onFieldChange?: (name: string, value: any) => void;
};

function DynamicFormInner<T extends FieldValues>(
  {
    formConfig,
    onSubmit,
    onError,
    submitButtonText = "Submit",
    defaultValues,
    layout = "vertical",
    size = "md",
    variant = "default",
    className = "",
    showErrors = true,
    loading = false,
    disabled = false,
    hideInternalSubmit = false,
    onFieldChange,
  }: Props<T>,
  ref: React.Ref<DynamicFormRef<T>>
) {
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    getValues,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onSubmit", // Changed to "onChange" for instant validation
    reValidateMode: "onChange", // Re-validate on every change
    shouldFocusError: true, // Focus on first error field
    criteriaMode: "firstError", // Show first error only
    delayError: 0, // No delay for showing errors
  });

  // Watch all fields to trigger re-renders when values change
  const watchedValues = watch();
  console.log("watchedValues", watchedValues);
  // Enhanced field change handler
  const handleFieldChange = (name: string, value: any) => {
    // Trigger validation for this specific field
    trigger(name as any);

    // Call the external field change handler if provided
    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  // Expose parent methods
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit, onError)(),
    validateSection: async (fields: string[]) =>
      await trigger(fields as unknown as any),
    getValues: () => getValues(),
    reset: () => {
      reset();
      // Clear any field-specific errors after reset
      setTimeout(() => trigger(), 0);
    },
    trigger: (name) => trigger(name as unknown as any),
  }));

  // useEffect(() => {
  //   if (showErrors) trigger();
  // }, []);

  const toggleSection = (index: number) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(index)) newCollapsed.delete(index);
    else newCollapsed.add(index);
    setCollapsedSections(newCollapsed);
  };

  const buttonContainerClass = formConfig.fullWidthButtons
    ? "space-y-4"
    : "flex flex-wrap gap-4";

  return (
    <div className={`${className} space-y-6`}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-6"
        noValidate
      >
        {/* Sections */}
        {formConfig.sections ? (
          <div className="space-y-8">
            {formConfig.sections.map((section, index) => (
              <div
                key={`section-${index}`}
                className="bg-white border rounded-lg p-6 shadow-sm"
              >
                {section.title && (
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    {section.collapsible && (
                      <button
                        type="button"
                        onClick={() => toggleSection(index)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label={
                          collapsedSections.has(index)
                            ? "Expand section"
                            : "Collapse section"
                        }
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-200 ${
                            collapsedSections.has(index) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                {section.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>
                )}

                {!section.collapsible || !collapsedSections.has(index)
                  ? renderFields<T>({
                      fields: section.fields,
                      control,
                      errors,
                      showErrors,
                      gridCols: formConfig.gridCols,
                      size,
                      layout,
                      variant,
                      onFieldChange: handleFieldChange, // Use enhanced handler
                      watchedValues, // Pass watched values to trigger re-renders
                    })
                  : null}
              </div>
            ))}
          </div>
        ) : (
          renderFields<T>({
            fields: formConfig.fields || [],
            control,
            errors,
            showErrors,
            gridCols: formConfig.gridCols,
            size,
            layout,
            variant,
            onFieldChange: handleFieldChange, // Use enhanced handler
            watchedValues, // Pass watched values to trigger re-renders
          })
        )}

        {/* Internal submit button */}
        {!hideInternalSubmit && (
          <div className={buttonContainerClass}>
            <Button
              type="submit"
              disabled={isSubmitting || loading || disabled}
              variant="primary"
              size="md"
              className={formConfig.fullWidthButtons ? "w-full" : ""}
            >
              {isSubmitting || loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                submitButtonText
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export const DynamicForm = forwardRef(DynamicFormInner) as <
  T extends FieldValues
>(
  props: Props<T> & { ref?: React.Ref<DynamicFormRef<T>> }
) => ReturnType<typeof DynamicFormInner>;

export default DynamicForm;
