"use server";

import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";

type LoginResponse = { success: true } | { error: string };

export async function validateEmail(credentials: {
  email: string;
}): Promise<LoginResponse> {
  try {
    const response: any = await safeAPICaller(
      APIKit.post("/validate-email", credentials)
    );
    if (!response?.success) {
      return { error: response?.message ?? "Email is not registered with us" };
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function validateOtp(credentials: {
  otp: number;
}): Promise<LoginResponse> {
  try {
    const response: any = await safeAPICaller(
      APIKit.post("/validate-otp", credentials)
    );
    if (!response?.success) {
      return { error: response?.message ?? "Please Enter a Valid OTP" };
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
