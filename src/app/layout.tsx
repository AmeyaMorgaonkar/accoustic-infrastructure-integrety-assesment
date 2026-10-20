import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0C0E",
};

export const metadata: Metadata = {
  title: "ImpulseNDT // Acoustic Infrastructure Integrity Assessment System",
  description:
    "High-precision non-destructive acoustic and vibration monitoring platform utilizing ESP32, ADXL345 accelerometer, and PZT piezoelectric transducers for real-time structural health diagnostics.",
  keywords: [
    "NDT",
    "Non-Destructive Testing",
    "Structural Health Monitoring",
    "ESP32",
    "ADXL345",
    "Piezoelectric",
    "Acoustic Diagnostics",
    "Fast Fourier Transform",
    "Infrastructure Integrity",
  ],
  authors: [{ name: "ImpulseNDT Engineering Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0B0C0E] text-[#E2E8F0] font-sans antialiased selection:bg-[#FF5C00]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
