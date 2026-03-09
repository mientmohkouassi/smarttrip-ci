import type { Metadata } from "next";
import "./globals.css";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`font-outfit antialiased bg-savannah selection:bg-primary/30`}>
        <AuthSessionProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
