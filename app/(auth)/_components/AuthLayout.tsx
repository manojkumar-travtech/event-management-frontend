// components/AuthLayout.tsx
import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayoutComponent = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="w-full flex flex-col items-center mb-4">
          <img
            src="/Logo/omega_logo.png"
            alt="ICE Logo"
            className="h-8 w-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutComponent;
