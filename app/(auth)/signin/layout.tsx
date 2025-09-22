import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin Panel-Login",
  description: "Event Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
