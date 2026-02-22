import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Font bawaan Next.js
import "./globals.css"; // Pengganti index.css

const inter = Inter({ subsets: ["latin"] });

// Pengaturan SEO Meta Tags otomatis di Next.js
export const metadata: Metadata = {
  title: "KathanIn - UI/UX Portfolio",
  description:
    "Mengubah Ide Menjadi Pengalaman UI/UX yang Mulus, Cepat, dan Interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Menambahkan scroll-smooth agar klik menu Navbar menggulir dengan halus
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#030014] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
