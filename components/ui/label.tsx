"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "mb-1 not-last:not-only:flex items-center gap-2 text-label-text text-[14px] font-[400] leading-[21px] tracking-[0.14px] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-['Lato']",
        className
      )}
      {...props}
    />
  )
}

export { Label }