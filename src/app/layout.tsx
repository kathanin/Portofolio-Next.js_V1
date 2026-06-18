import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import "@/app/globals.css";

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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased transition-colors duration-500`}
      >
        <ThemeProvider>
          {/* Efek baru kita tempatkan di sini */}
          <ScrollProgress />
          <CustomCursor />

          {/* Wrapper Fixed untuk Theme Toggle agar selalu mengambang di pojok kanan atas */}
          <div className="fixed top-6 right-6 md:top-8 md:right-12 z-[100]">
            <ThemeToggle />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
