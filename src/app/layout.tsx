import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SmartTrip CI | Your Gateway to Côte d'Ivoire",
  description: "Discover the hidden gems of Côte d'Ivoire with the world's most advanced AI travel companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-outfit antialiased bg-savannah selection:bg-primary/30`}>
        <AuthSessionProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
