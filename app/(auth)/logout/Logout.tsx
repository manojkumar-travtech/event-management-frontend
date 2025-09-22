"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { logoutAction } from "./logoutAction";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await logoutAction();
      if (res.success) {
        router.push("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={handleLogout}>Handle logout</Button>
    </div>
  );
};

export default Logout;
