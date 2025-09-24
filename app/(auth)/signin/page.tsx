import React from "react";
import LoginForm from "../_components/LoginForm";
import AuthLayoutComponent from "../_components/AuthLayout";

const page = () => {
  return (
    <AuthLayoutComponent title=" Admin Panel Login">
      <LoginForm />
    </AuthLayoutComponent>
  );
};

export default page;
