"use client";

import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "./SocialLinks";
import Komentar from "./Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Notifikasi Loading dengan tema custom
    Swal.fire({
      title: "Mengirim Pesan...",
      html: "<span class='text-sm text-slate-500 dark:text-slate-400'>Menghubungkan ke server...</span>",
      allowOutsideClick: false,
      showConfirmButton: false,
      background: "transparent",
      customClass: {
        // Efek glassmorphism yang sama dengan form Anda
        popup:
          "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl",
        title:
          "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: "Pesan Baru dari Website Portfolio",
        from_name: "Portfolio Terminal",
      };

      const response = await axios.post(
        "https://api.web3forms.com/submit",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (response.data.success) {
        // 2. Notifikasi Sukses dengan tema custom
        Swal.fire({
          title: "Thank You!",
          text: "Your message has been received. I'll get back to you as soon as possible.",
          icon: "success",
          iconColor: "#10b981", // Warna emerald green agar terlihat techy
          background: "transparent",
          buttonsStyling: false, // Mematikan style tombol bawaan
          confirmButtonText: "Tutup",
          customClass: {
            popup:
              "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl",
            title: "text-2xl font-bold text-slate-800 dark:text-white mb-2",
            htmlContainer: "text-slate-600 dark:text-slate-400 text-sm",
            // Menggunakan style tombol gradient yang persis dengan tombol "Kirim Pesan" Anda
            confirmButton:
              "mt-4 w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98]",
          },
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Gagal mengirim pesan");
      }
    } catch (error: any) {
      console.error(error);
      // 3. Notifikasi Error dengan tema custom
      Swal.fire({
        title: "Koneksi Terputus",
        text: "Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.",
        icon: "error",
        iconColor: "#ef4444",
        background: "transparent",
        buttonsStyling: false,
        confirmButtonText: "Coba Lagi",
        customClass: {
          popup:
            "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl",
          title: "text-2xl font-bold text-slate-800 dark:text-white mb-2",
          htmlContainer: "text-slate-600 dark:text-slate-400 text-sm",
          confirmButton:
            "mt-4 w-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] text-slate-800 dark:text-white">
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hubungi Saya
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          {/* Kolom Kiri: Kontak Form */}
          <div className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-transparent backdrop-blur-xl rounded-3xl shadow-xl dark:shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-500 hover:shadow-[#6366f1]/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Hubungi
                </h2>
                <p className="text-slate-600 dark:text-gray-400">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita
                  bicara.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-400 dark:text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-slate-50 dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/20 placeholder-slate-400 dark:placeholder-gray-500 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 dark:text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-slate-50 dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/20 placeholder-slate-400 dark:placeholder-gray-500 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400 dark:text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-slate-50 dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/20 placeholder-slate-400 dark:placeholder-gray-500 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex justify-center w-full">
              <SocialLinks />
            </div>
          </div>

          {/* Kolom Kanan: Komentar */}
          <div className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-transparent backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-xl dark:shadow-2xl transform transition-all duration-500 hover:shadow-[#6366f1]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
