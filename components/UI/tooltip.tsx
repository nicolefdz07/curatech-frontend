"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

function TooltipProvider({
  delayDuration = 150,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  );
}

const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  sideOffset = 8,
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={[
          "z-50 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-md",
          "data-[state=delayed-open]:data-[side=bottom]:animate-in data-[state=closed]:animate-out",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
