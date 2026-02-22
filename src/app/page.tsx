"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Import semua komponen yang sudah kita buat
import WelcomeScreen from "@/components/WelcomeScreen";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/Background";
import Hero from "@/components/Hero"; // Ini adalah Home.jsx lama
import About from "@/components/About";
import Portofolio from "@/components/Portofolio";
import ContactPage from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandingPage() {
  // State untuk mengontrol Welcome Screen
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  return (
    <main>
      {/* Animasi Welcome Screen */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Konten Utama (Hanya muncul setelah Welcome Screen selesai) */}
      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />

          {/* Komponen-komponen ini ditumpuk agar bisa di-scroll */}
          <div className="relative z-10">
            <Hero />
            <About />
            <Portofolio />
            <ContactPage />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
