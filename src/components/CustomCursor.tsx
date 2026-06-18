"use client";

import React, { useEffect, useRef } from "react";

export default function StarryCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Menyesuaikan ukuran canvas dengan layar
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Kelas untuk membuat setiap titik bintang
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      decay: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Ukuran bintang acak (kecil-kecil agar elegan)
        this.size = Math.random() * 2 + 0.5;

        // Palet warna yang menyatu dengan tema UI/UX Anda
        const colors = ["#a855f7", "#6366f1", "#e0e7ff", "#ffffff", "#c084fc"];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Pergerakan: Menyebar ke samping dan jatuh perlahan ke bawah
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 + 0.8; // Angka +0.8 membuat efek "jatuh"

        // Durasi hidup partikel sebelum menghilang
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;

        // Efek Glow (Gemerlap)
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        // Menggambar bentuk bintang 4 sudut (Diamond/Sparkle)
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size / 2, -this.size / 2);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.lineTo(-this.size, 0);
        ctx.lineTo(-this.size / 2, -this.size / 2);
        ctx.closePath();

        ctx.fill();
        ctx.restore();
      }
    }

    // Mendeteksi pergerakan mouse
    const handleMouseMove = (e: MouseEvent) => {
      // Menambahkan 2-3 bintang setiap kali kursor digeser
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Loop Animasi
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);

        // Hapus bintang yang sudah redup untuk menghemat memori
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup saat komponen dilepas
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // z-[9999] agar selalu di atas, pointer-events-none agar tombol tetap bisa diklik
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
