"use client";

import React, { useEffect } from "react";
import { Linkedin, Github, Instagram } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Komponen Ikon TikTok Kustom
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "LinkedIn",
    subText: "Let's Connect",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/kathanindranugraha/",
    color: "#0A66C2",
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@kthanind",
    icon: Instagram,
    url: "https://www.instagram.com/kthanind/",
    gradient: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@kathanin",
    icon: Github,
    url: "https://github.com/kathanin",
    color: "#181717",
  },
  {
    name: "TikTok",
    displayName: "TikTok",
    subText: "@notriseonlypotato",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@notriseonlypotato",
    color: "#000000",
  },
];

export default function SocialLinks() {
  useEffect(() => {
    AOS.init({ offset: 10 });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 w-full">
      {/* Judul: Connect With Me */}
      <div className="flex items-center gap-3" data-aos="fade-up">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
          Connect With Me
        </h3>
      </div>

      {/* Grid 2x2 (Sesuai Referensi Gambar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none dark:hover:bg-white/5"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 relative overflow-hidden ${
                  link.gradient ? link.gradient : ""
                }`}
              >
                {/* Latar Belakang Warna Ikon (Handling khusus untuk Github/Tiktok di mode gelap) */}
                <div
                  className={`absolute inset-0 ${
                    link.name === "GitHub" || link.name === "TikTok"
                      ? "bg-black dark:bg-white/10"
                      : ""
                  }`}
                  style={
                    !link.gradient &&
                    link.name !== "GitHub" &&
                    link.name !== "TikTok"
                      ? { backgroundColor: link.color }
                      : {}
                  }
                ></div>

                <Icon className="w-6 h-6 relative z-10 text-white" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm md:text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {link.displayName}
                </span>
                <span className="text-xs md:text-sm text-slate-500 dark:text-gray-400 truncate">
                  {link.subText}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
