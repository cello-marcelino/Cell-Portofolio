import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Christian Marcelino — Portfolio",
  description:
    "Portfolio of Christian Marcelino, Informatics Engineering student at Politeknik Negeri Batam. Showcasing web systems, backend services, and practical applied AI projects.",
  keywords: [
    "Christian Marcelino",
    "Marcel",
    "Junior Developer",
    "Informatics Engineering",
    "Politeknik Negeri Batam",
    "Web Developer",
    "Applied AI",
    "Flask",
    "Vue 3",
    "Next.js",
  ],
  icons: {
    icon: "/brand/cell-logo-square.png",
    apple: "/brand/cell-logo-square.png",
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FBFBFA] text-[#0F172A] antialiased selection:bg-teal-100 selection:text-teal-900 relative overflow-x-hidden">
        <CustomCursor />
        <InteractiveBackground />
        <Navbar />
        <SmoothScrollProvider>
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
