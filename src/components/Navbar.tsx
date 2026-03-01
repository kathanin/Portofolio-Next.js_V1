"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Daftar menu beserta ID tujuannya
  const navLinks = [
    { name: "Home", href: "#Home" },
    { name: "About", href: "#About" },
    { name: "Portofolio", href: "#Portofolio" },
    { name: "Contact", href: "#Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Efek glass/shadow akan lebih tebal jika di-scroll ke bawah
      setIsScrolled(window.scrollY > 50);

      // Logika untuk mendeteksi sedang berada di halaman (section) mana
      const scrollPosition = window.scrollY + 250; // Offset agar perpindahan state lebih natural

      navLinks.forEach((link) => {
        const targetId = link.href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(link.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Panggil sekali saat pertama kali dimuat
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk scroll halus (smooth scroll) saat menu diklik
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Tutup menu mobile jika sedang terbuka

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(name);
    }
  };

  return (
    <>
      {/* 1. Logo (Pojok Kiri Atas) */}
      <div className="fixed top-6 left-6 md:left-10 z-[100]">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home", "Home")}
          className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300 block"
        >
          Kathanin
        </a>
      </div>

      {/* 2. Desktop Navbar (Melayang di Tengah) */}
      <nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
            isScrolled
              ? "glass shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              : "bg-white/5 border border-white/10 backdrop-blur-md"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, link.name)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeSection === link.name
                  ? "bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]" // Indikator Aktif
                  : "text-gray-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. Mobile Menu Button (Pojok Kanan, di sebelah kiri ThemeToggle) */}
      <div className="md:hidden fixed top-6 right-20 z-[100]">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 glass rounded-full text-gray-300 hover:text-cyan-400 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[300px] glass rounded-2xl p-4 z-[99] flex flex-col gap-2 shadow-2xl animate-slide-up">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, link.name)}
              className={`px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                activeSection === link.name
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20"
                  : "text-gray-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
