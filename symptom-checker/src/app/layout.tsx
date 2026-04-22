import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SymptomProvider } from "@/contexts/SymptomContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediAssist - AI Health Symptom Checker",
  description: "An intelligent AI-powered health symptom checker and risk predictor. Check your symptoms and get instant insights.",
  keywords: "health, symptoms, checker, AI, diagnosis, medical, health screening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-black via-slate-900 to-black">
        <SymptomProvider>
          {children}
        </SymptomProvider>
      </body>
    </html>
  );
}
