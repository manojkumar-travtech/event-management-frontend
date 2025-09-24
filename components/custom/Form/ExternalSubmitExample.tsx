'use client'

import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { useRef, useState } from "react";

// Step 1 type
type Step1Values = {
  firstName: string;
  country: string;
};

// Step 2 type
type Step2Values = {
  email: string;
};

export default function ExternalSubmitExample() {
  const [activeStep, setActiveStep] = useState(0);

  // Refs to forms
  const form1Ref = useRef<DynamicFormRef<Step1Values>>(null);
  const form2Ref = useRef<DynamicFormRef<Step2Values>>(null);

  // Form data state
  const [form1Data, setForm1Data] = useState<Step1Values>({
    firstName: "",
    country: "",
  });
  const [form2Data, setForm2Data] = useState<Step2Values>({
    email: "",
  });

  const handleonChange = (values:any ) => {
   console.log('values',values)
  }
  // Steps configuration
  const steps = [
    {
      label: "Personal Info",
      ref: form1Ref,
      component: (
        <DynamicForm<Step1Values>
          ref={form1Ref}
          formConfig={{
            fields: [
              { name: "firstName", label: "First Name", type: "text", validation: { required: "First name is required" } },
              { name: "country", label: "Country", type: "text", validation: { required: "Country is required" } },
            ],
            gridCols: 1,
          }}
          onSubmit={(data : any ) => setForm1Data(data)}
          onChange={handleonChange}
          defaultValues={form1Data}
          externalSubmit
        />
      ),
    },
    {
      label: "Contact Info",
      ref: form2Ref,
      component: (
        <DynamicForm<Step2Values>
          ref={form2Ref}
          formConfig={{
            fields: [
              {
                name: "email",
                label: "Email",
                type: "email",
                validation: {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                },
              },
            ],
            gridCols: 1,
          }}
          onSubmit={(data) => setForm2Data(data)}
          onChange={(values) => setForm2Data(values)}
          defaultValues={form2Data}
          externalSubmit
        />
      ),
    },
  ];

  // Next step handler
  const handleNext = async () => {
    const currentStep = steps[activeStep];
    const formRef = currentStep.ref;

    if (!formRef.current) return;

    // ✅ submit returns boolean if valid
    const isStepValid = await formRef.current.submit();

    if (isStepValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        // ✅ Final submission
        const finalData = {
          ...form1Ref.current?.getValues(),
          ...form2Ref.current?.getValues(),
        };
        console.log("Final Data:", finalData);
        alert("All steps valid ✅\n" + JSON.stringify(finalData, null, 2));
      }
    }
  };

  // Back handler
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Stepper Example</h1>

      {/* Stepper header */}
      <div className="flex gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg ${
              index === activeStep ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Current step */}
      <div>{steps[activeStep].component}</div>

      {/* Navigation */}
      <div className="flex justify-between">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
