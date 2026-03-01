import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent px-[5%] sm:px-[10%] pb-6">
      {/* Perubahan Light/Dark: Garis pemisah slate-200 di Light, putih transparan di Dark */}
      <hr className="my-6 border-slate-200 dark:border-white/10 transition-colors duration-300" />

      <div className="text-center">
        {/* Perubahan Light/Dark: Teks slate-600 di Light, abu-abu di Dark */}
        <span className="block text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
          © {new Date().getFullYear()}{" "}
          <a
            href="#Home"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline transition-colors duration-300"
          >
            KathanIn™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
