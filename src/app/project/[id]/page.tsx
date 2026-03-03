"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  LucideIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import Footer from "@/components/Footer";

interface ProjectData {
  id: string | number;
  Title: string;
  Description: string;
  Img: string;
  Link: string;
  Github: string;
  TechStack: string[];
  Features: string[];
}

const TECH_ICONS: Record<string, LucideIcon> = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    // Perubahan Light/Dark: bg-blue-50 di Light, bg-white/5 (kaca gelap) di Dark
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-blue-50 dark:bg-white/5 rounded-xl border border-blue-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20 transition-all duration-300 cursor-default shadow-sm dark:shadow-none">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: string }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }: { project: ProjectData }) => {
  const techStackCount = project.TechStack?.length || 0;
  const featuresCount = project.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden relative shadow-sm dark:shadow-none transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-50 blur-2xl z-0" />

      {/* Kotak Total Teknologi */}
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-blue-50/50 dark:bg-white/5 p-2 md:p-3 rounded-lg border border-blue-100 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-none">
        <div className="bg-blue-100 dark:bg-white/10 p-1.5 md:p-2 rounded-full">
          <Code2
            className="text-blue-600 dark:text-blue-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-200">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400">
            Total Teknologi
          </div>
        </div>
      </div>

      {/* Kotak Fitur Utama */}
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-purple-50/50 dark:bg-white/5 p-2 md:p-3 rounded-lg border border-purple-100 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-none">
        <div className="bg-purple-100 dark:bg-white/10 p-1.5 md:p-2 rounded-full">
          <Layers
            className="text-purple-600 dark:text-purple-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-200">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400">
            Fitur Utama
          </div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink: string) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#3085d6",
      background: "var(--swal-bg, #030014)",
      color: "var(--swal-text, #ffffff)",
    });
    return false;
  }
  return true;
};

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const storedProjects = JSON.parse(
        localStorage.getItem("projects") || "[]",
      );
      const selectedProject = storedProjects.find(
        (p: any) => String(p.id) === id,
      );

      if (selectedProject) {
        const enhancedProject: ProjectData = {
          ...selectedProject,
          Features: selectedProject.Features || [],
          TechStack: selectedProject.TechStack || [],
          Github: selectedProject.Github || "https://github.com/EkiZR",
        };
        setProject(enhancedProject);
      }
    } catch (error) {
      console.error("Gagal mengambil data proyek:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030014] transition-colors duration-300 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
            Loading Project...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] transition-colors duration-300 px-[2%] sm:px-0 relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] dark:opacity-[0.02]" />
      </div>

      <div className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <Link
              href="/#Portofolio"
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white shadow-sm dark:bg-white/5 backdrop-blur-xl rounded-xl text-slate-700 dark:text-white/90 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-sm md:text-base dark:shadow-none"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-slate-500 dark:text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-slate-800 dark:text-white/90 truncate">
                {project.Title}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-300/90 leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Tombol Live Demo */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-blue-50 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-blue-700 dark:text-blue-300 rounded-xl transition-all duration-300 border border-blue-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20 backdrop-blur-xl overflow-hidden text-sm md:text-base shadow-sm dark:shadow-none"
                >
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                {/* Tombol Github */}
                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-purple-50 dark:bg-white/5 hover:bg-purple-100 dark:hover:bg-white/10 text-purple-700 dark:text-purple-300 rounded-xl transition-all duration-300 border border-purple-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 backdrop-blur-xl overflow-hidden text-sm md:text-base shadow-sm dark:shadow-none"
                  onClick={(e) =>
                    !handleGithubClick(project.Github) && e.preventDefault()
                  }
                >
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-500 dark:text-blue-400" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 opacity-50">
                    No technologies added.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl group bg-white dark:bg-transparent">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 dark:group-hover:border-white/10 transition-colors duration-300 rounded-2xl z-20 pointer-events-none" />
              </div>

              <div className="bg-white dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none space-y-6 hover:border-slate-300 dark:hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-gray-400 opacity-50">
                    No features added.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
