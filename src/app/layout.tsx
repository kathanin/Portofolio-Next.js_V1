import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider"; // Import Provider kita
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Kathan | UI/UX Designer & Programmer",
  description: "Portofolio profesional UI/UX dan Frontend Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // PENTING: Tambahkan suppressHydrationWarning di tag html agar Next.js tidak komplain
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased transition-colors duration-500`}
      >
        {/* Bungkus seluruh isi website dengan ThemeProvider */}
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
