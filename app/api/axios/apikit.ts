import axios, { AxiosInstance, AxiosResponse } from "axios";
import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_BASEURL}`;
const TIMEOUT = 1000000;

const isSuccess = (status: number) => [200, 201, 204, 409].includes(status);

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = cookies();
  const rawToken = (await cookieStore).get("access_token")?.value;
  if (!rawToken) return undefined;
  return rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
}

function createAPIKit(): AxiosInstance {
  const instance = axios.create({ baseURL: BASE_URL, timeout: TIMEOUT });

  instance.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) config.headers.Authorization = token;
    return config;
  });

  return instance;
}

export const APIKit = createAPIKit();

export async function safeAPICaller<T>(
  apiCall: Promise<AxiosResponse<T>>
): Promise<{ success: boolean; message?: string; data?: T } | T> {
  try {
    const response = await apiCall;
    return isSuccess(response.status)
      ? response.data
      : ({ success: false, message: "Unexpected response" } as const);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
        return {
          success: false,
          message: "Connection error. Check your network and server.",
        };
      }
      if (error.response) {
        return (
          error.response.data ?? {
            success: false,
            message: error.response.statusText || "Unknown API error",
          }
        );
      }
      return { success: false, message: error.message };
    }
    return { success: false, message: error?.message || "Unexpected error" };
  }
}

export default APIKit;
