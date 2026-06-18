"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  // Mendeteksi seberapa jauh halaman telah di-scroll (nilai 0 sampai 1)
  const { scrollYProgress } = useScroll();

  // Memberikan efek "pegas" (spring) agar pergerakan bar-nya lebih smooth, tidak kaku
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[100]"
      // Menggunakan gradient warna yang senada dengan tombol/tema UI Anda
      style={{
        scaleX,
        background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
      }}
    />
  );
};

export default ScrollProgress;
