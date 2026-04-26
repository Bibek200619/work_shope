import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SymptomProvider } from "@/contexts/SymptomContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediAssist - AI Health Symptom Checker",
  description: "An intelligent AI-powered health symptom checker and risk predictor.",
  keywords: "health, symptoms, checker, AI, diagnosis, medical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050506] font-sans">
        <SymptomProvider>
          {children}
        </SymptomProvider>
      </body>
    </html>
  );
}
