"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CustomDrawerProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  footerButtons?: React.ReactNode
  children?: React.ReactNode
  direction?: "left" | "right" | "top" | "bottom"
  showClose?: boolean
}

export function CustomDrawer({
  trigger,
  title,
  description,
  footerButtons,
  children,
  direction = "right",
  showClose = true,
}: CustomDrawerProps) {
  // Define direction-based classes
  const directionClass = {
    top: "inset-x-0 top-0 max-h-[80vh] rounded-b-lg border-b",
    bottom: "inset-x-0 bottom-0 max-h-[80vh] rounded-t-lg border-t",
    right: "inset-y-0 right-0 w-3/4 sm:max-w-sm border-l",
    left: "inset-y-0 left-0 w-3/4 sm:max-w-sm border-r",
  }[direction]

  return (
    <DrawerPrimitive.Root>
      <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>

      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <DrawerPrimitive.Content
        >
          {showClose && (
            <DrawerPrimitive.Close className="absolute top-4 right-4 text-foreground font-bold text-lg">
              ✕
            </DrawerPrimitive.Close>
          )}

          {(title || description) && (
            <div className="p-4 flex flex-col gap-1.5">
              {title && <h3 className="text-foreground font-semibold">{title}</h3>}
              {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
          )}

          <div className="p-4 flex-1">{children}</div>

          {footerButtons && <div className="p-4 flex gap-2">{footerButtons}</div>}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
