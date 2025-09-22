"use client";

import { FormConfig } from "../Form/Formtypes.types";

type MyFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

export const formConfig: FormConfig<MyFormValues> = {
  title: "User Registration",
  description: "Fill out the details to register",
  gridCols: 2,
  enableReset: true,

  sections: [
    {
      title: "Personal Info",
      description: "Please enter your basic details",
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "First Name",
          placeholder: "Enter first name",
          validation: { required: "First name is required" },
          colSpan: 2,
        },
        {
          name: "lastName",
          type: "text",
          label: "Last Name",
          placeholder: "Enter last name",
          validation: { required: "Last name is required" },
        },
        {
          name: "lastName",
          type: "checkbox",
          label: "Last Name",
          placeholder: "Enter last name",
          validation: { required: "Last name is required" },
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
          validation: {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          },
          colSpan: 2,
        },
      ],
    },
    {
      title: "Security Info",
      description: "Setup your login credentials",
      fields: [
        {
          name: "age",
          type: "number",
          label: "Age",
          placeholder: "Enter your age",
          validation: {
            required: "Age is required",
            min: { value: 18, message: "Must be at least 18" },
          },
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Enter password",
          validation: {
            required: "Password is required",
            minLength: { value: 6, message: "Min length is 6" },
          },
        },
        {
          name: "confirmPassword",
          type: "password",
          label: "Confirm Password",
          placeholder: "Re-enter password",
          validation: {
            required: "Confirm Password is required",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          },
        },
      ],
    },
  ],
};
