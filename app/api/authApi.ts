import { NextResponse } from "next/server";
import APIKit, { safeAPICaller } from "./axios/apikit";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response: any = await safeAPICaller(
    APIKit.post("/admin/login", { email, password })
  );

  if (!response.success) {
    return NextResponse.json({ error: response.message }, { status: 401 });
  }

  const token = response.token;

  const res = NextResponse.json({ success: true, user: response.user });
  res.cookies.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1h
  });

  return res;
}
