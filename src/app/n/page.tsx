"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";

export default function SecretLovePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a] font-space-grotesk flex items-center justify-center selection:bg-rose-500/30">
      {/* Tombol Rahasia Kembali */}
      <Link
        href="/#about"
        className="absolute top-8 left-8 z-50 text-white/30 hover:text-white/80 transition-colors flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="opacity-0 hover:opacity-100 transition-opacity duration-300">
          Kembali ke realita
        </span>
      </Link>

      {/* Cinematic Golden Hour Light Leaks (Efek Cahaya Senja Kamera Analog) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-amber-500/20 via-orange-400/10 to-transparent rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-rose-900/30 via-red-800/10 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
        {/* Sisi Kiri: Teks Puitis */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-rose-300/80">
              <Camera className="w-4 h-4" />
              <span className="text-xs tracking-[0.3em] uppercase">
                35mm Film Archive
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-rose-200 mb-6">
              You are my <br /> favorite serendipity.
            </h1>

            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
              Di antara jutaan baris kode dan logika yang rumit, kamu adalah
              satu-satunya variabel yang paling indah dan tak tergantikan di
              hidupku.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <span className="w-12 h-[1px] bg-rose-400/50"></span>
            <Heart className="w-5 h-5 text-rose-500 animate-pulse fill-rose-500" />
            <span className="w-12 h-[1px] bg-rose-400/50"></span>
          </motion.div>
        </div>

        {/* Sisi Kanan: Foto Polaroid Nostalgia */}
        <motion.div
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 3, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 1,
          }}
          className="relative w-72 md:w-80"
        >
          {/* Tumpukan Polaroid di belakang agar terlihat seperti koleksi */}
          <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-sm shadow-2xl transform -rotate-6 translate-x-2 translate-y-4"></div>

          {/* Frame Polaroid Utama */}
          <div className="relative bg-[#f8f8f8] p-4 pb-16 rounded-sm shadow-2xl hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer group">
            {/* Tekstur grain samar pada kertas polaroid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="relative w-full aspect-[4/5] bg-zinc-800 overflow-hidden rounded-sm">
              {/* PERBAIKAN 1: Tambahkan pointer-events-none di sini agar tidak memblokir klik */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 mix-blend-overlay"></div>

              {/* PERBAIKAN 2: Tambahkan relative dan z-20 pada video */}
              <video
                src="/video-doi.mp4"
                controls
                playsInline
                className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-700"
              />
            </div>

            {/* Tulisan Tangan di bawah Polaroid */}
            <div className="absolute bottom-4 left-0 w-full text-center">
              <span className="font-outfit text-xl text-zinc-800 font-medium opacity-80 transform -rotate-2 inline-block">
                My Love ♡
              </span>
            </div>

            {/* Efek Bintang/Kilau saat dihover */}
            <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
