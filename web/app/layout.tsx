"use client";

import { Inter } from "next/font/google";
import { AppContextProvider } from "@/src/context";
import NavigationBar from "@/src/components/Navigation/NavigationBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <NavigationBar />
          <div className="mt-[120px]">{children}</div>
        </AppContextProvider>
      </body>
    </html>
  );
}
