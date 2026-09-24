import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ variable: "--font-sans", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Rockstat Analytics",
  description: "Web analytics dashboard over Rockstat ClickHouse data",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans text-sm">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
