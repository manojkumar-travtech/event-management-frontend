"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { validateEmail } from "../actions/forgotPasswordAction";
import { DynamicForm } from "@/components/custom/Form";

const formConfig = {
  title: "",
  description: "",
  showProgress: false,
  fullWidthButtons: true,
  gridCols: 1,

  fields: [
    {
      name: "loginIdentifier",
      label: "Email Address",
      type: "email",
      placeholder: "Enter Your Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^@]+@[^@]+\.[^@]+$/,
          message: "Invalid email format",
        },
      },
    },
  ],
};

const ValidateEmail = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await validateEmail(data);
      if ("success" in result) {
        if (result.success === true) {
          "success" in result;
        }
        router.push("/");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto">
        <DynamicForm
          loading={loading}
          formConfig={formConfig as any}
          onSubmit={handleSubmit}
          submitButtonText="Validate Email"
        />
      </div>
    </>
  );
};

export default ValidateEmail;
