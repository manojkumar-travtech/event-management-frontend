import React from "react";
import ValidateEmail from "../_components/ValidateEmail";
import AuthLayoutComponent from "../_components/AuthLayout";

const ForgotPasswordPage = () => {
  return (
    <AuthLayoutComponent title="Forgot password">
      <ValidateEmail />
    </AuthLayoutComponent>
    
  );
};

export default ForgotPasswordPage;
