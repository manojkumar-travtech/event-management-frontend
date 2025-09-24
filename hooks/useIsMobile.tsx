"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false); // default false on SSR

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);

    checkIsMobile(); // set initial value on client
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

