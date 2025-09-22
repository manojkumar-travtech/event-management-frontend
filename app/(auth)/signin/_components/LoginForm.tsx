"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DynamicForm from "@/components/custom/newForm/DynamicForm";
import { Typography } from "@/components/custom/Typography";
import Link from "next/link";

import { loginAction } from "../actions/loginAction";

const formConfig = {
  title: "",
  description: "",
  showProgress: false,
  fullWidthButtons: true,
  gridCols: 1,
  sections: [
    {
      fields: [
        {
          name: "email",
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
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
          validation: {
            required: "Email is required",
          },
        },
        {
          name: "welcome",
          type: "custom",
          label: "",
          render: () => (
            <div className="flex justify-end">
              <Link href={"/forgot-password"}>
                <Typography size="lg" className="text-blue-600">
                  Forgot password?
                </Typography>
              </Link>
            </div>
          ),
        },
      ],
    },
  ],
};

const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await loginAction(data);
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
          submitButtonText="Login"
        />
      </div>
    </>
  );
};

export default LoginForm;
