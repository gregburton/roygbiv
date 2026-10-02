import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils/shadcn-utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "roygbiv",
  description: "Do stuff with colors",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="min-h-svh w-full grid grid-rows-[min-content_1fr]">
              <Header />
              {children}
            </div>
            <Toaster richColors />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
