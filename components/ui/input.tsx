import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 bg-white border border-[#D0D5DD] rounded px-4 py-2 text-[16px] font-normal text-[#344054] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 font-['Lato']",
        "focus-visible:border-primary-50 focus-visible:ring-primary-50 focus-visible:ring-[3px]",
        "aria-invalid:error-400 dark:aria-invalid:error-200 aria-invalid:border-error-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };