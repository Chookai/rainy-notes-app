"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { UndoProvider } from "@/components/undo-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user"><UndoProvider>{children}</UndoProvider></MotionConfig>
    </ThemeProvider>
  );
}
