import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timer Application",
  description: "Simple Timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"relative")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="absolute right-2 top-3">
            <ModeToggle />
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
