"use server";

import { cookies } from "next/headers";
import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";

type LoginResponse = { success: true } | { error: string };

export async function loginAction(credentials: {
  loginIdentifier: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response: any = await safeAPICaller(
      APIKit.post("/login", credentials)
    );
    if (!response?.success) {
      // clear cookie if login failed (avoid stale token)
      (await cookies()).delete("access_token");
      return { error: response?.message ?? "Login failed" };
    }

    if (response?.data?.accessToken) {
      (await cookies()).set("access_token", response?.data?.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });
    }

    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
