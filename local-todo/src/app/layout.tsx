import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { Providers } from "@/components/providers";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Small Hours — Local tasks",
  description: "A little less on your mind. Simple lists, stored on your device.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <a href="#main" className="skip-link">Skip to content</a>
          <header className="app-header">
            <div className="header-inner">
              <Link href="/" className="brand" aria-label="Small Hours home">
                <span className="brand-symbol"><Check size={21} strokeWidth={3} aria-hidden="true" /></span>
                Small Hours<span className="brand-dot">.</span>
              </Link>
              <div className="header-actions">
                <span className="local-badge"><span /> Local workspace</span>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main id="main" className="workspace">{children}</main>
          <footer className="app-footer">
            <span><ShieldCheck size={14} aria-hidden="true" /> On your device. On your terms.</span>
            <span>One small thing at a time.</span>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
