"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/supabase";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  Rocket,
  MonitorSmartphone,
  Code2,
  Lightbulb,
  Zap,
} from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };

    if (id) fetchProject();
  }, [id]);

  const handleGoBack = () => {
    router.replace("/#portofolio");
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-space-grotesk gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Proyek tidak ditemukan.
        </h1>
        <button
          onClick={handleGoBack}
          className="text-indigo-500 hover:underline cursor-pointer"
        >
          Kembali ke Portofolio
        </button>
      </div>
    );
  }

  // Variasi Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION DENGAN ANIMASI */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Tombol Back - Diposisikan sejajar Navbar (top-6 md:top-8) dan dianimasikan */}
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          onClick={handleGoBack}
          className="absolute top-6 md:top-8 left-6 md:left-12 z-50 flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-black/40 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black/60 transition-all font-space-grotesk text-sm font-medium shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </motion.button>

        <div className="absolute inset-0">
          {/* Animasi Scale (Zoom-out perlahan) pada gambar */}
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={project.Img}
            alt={project.Title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradasi yang lebih membaur dengan global theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/10"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12">
          <div className="max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter text-gray-900 dark:text-white mb-4 drop-shadow-sm"
            >
              {project.Title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* 2. CONTENT SECTION BENTO GRID DENGAN HOVER FLOAT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 md:px-12 -mt-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-8 flex flex-col gap-8 md:gap-10">
            {/* Box Deskripsi */}
            <motion.section
              variants={itemVariants}
              className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-zinc-800/50 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1.5 transition-transform duration-500"
            >
              <div className="flex items-center gap-3 mb-6 text-indigo-500">
                <Lightbulb className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white">
                  Deskripsi Proyek
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-space-grotesk leading-relaxed">
                {project.Description}
              </p>
            </motion.section>

            {/* Box Fitur Utama */}
            <motion.section
              variants={itemVariants}
              className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-zinc-800/50 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1.5 transition-transform duration-500"
            >
              <div className="flex items-center gap-3 mb-8 text-indigo-500">
                <Rocket className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white">
                  Fitur Utama
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.Features?.map((feature: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800/50 transition-colors"
                  >
                    <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-space-grotesk text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Box Teknologi */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden hover:-translate-y-1.5 transition-transform duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">
                  Teknologi
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.TechStack?.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700/50 font-space-grotesk flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-default"
                  >
                    <Layers className="w-3 h-3 text-indigo-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Box Akses Proyek */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1.5 transition-transform duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <MonitorSmartphone className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white">
                  Akses Proyek
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {project.Link && (
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-space-grotesk font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.Github && (
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-space-grotesk font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                  >
                    <span>Source Code</span>
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
