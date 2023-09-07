"use client";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
}
export function TooltipProvider({ children }: TooltipProviderProps) {
  return <Tooltip.Provider delayDuration={0}>{children}</Tooltip.Provider>;
}
