// app/actions/logoutAction.ts
"use server";

import { cookies } from "next/headers";

export async function logoutAction(): Promise<{ success: boolean }> {
  (await cookies()).delete("access_token");
  return { success: true };
}
