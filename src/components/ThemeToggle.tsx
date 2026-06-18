"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Cloud, Stars } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Menghindari Hydration Mismatch pada Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Skeleton loader saat komponen belum ter-mount
    return (
      <div className="w-[76px] h-[36px] rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex items-center w-[76px] h-[36px] rounded-full p-1 cursor-pointer transition-all duration-500 overflow-hidden outline-none ${
        isDark
          ? "bg-[#0f172a] border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          : "bg-sky-200 border border-white/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      }`}
      aria-label="Toggle Dark Mode"
    >
      {/* Background Elements (Awan di kiri, Bintang di kanan) */}
      <div className="absolute inset-0 flex justify-between items-center px-2.5 pointer-events-none">
        {/* Awan untuk Light Mode */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            y: isDark ? 10 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Cloud className="w-4 h-4 text-white/90 drop-shadow-sm" />
        </motion.div>

        {/* Bintang untuk Dark Mode */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -10,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Stars className="w-4 h-4 text-indigo-300 drop-shadow-[0_0_5px_rgba(165,180,252,0.8)]" />
        </motion.div>
      </div>

      {/* Thumb (Lingkaran yang bergeser) */}
      <motion.div
        className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-md z-10 ${
          isDark
            ? "bg-zinc-900 shadow-indigo-900/50"
            : "bg-white shadow-amber-200/50"
        }`}
        initial={false}
        animate={{
          x: isDark ? 40 : 0, // 76px (container) - 8px (padding) - 28px (thumb) = 40px jarak geser
          rotate: isDark ? 360 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
