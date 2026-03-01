"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

interface CardProjectProps {
  Img: string;
  Title: string;
  Description: string;
  Link?: string;
  id?: string | number;
}

const CardProject: React.FC<CardProjectProps> = ({
  Img,
  Title,
  Description,
  Link: ProjectLink,
  id,
}) => {
  const handleLiveDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      {/* Perubahan Light/Dark: Latar belakang kaca putih di Light Mode, kaca gelap di Dark Mode */}
      <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-lg border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20">
        {/* Overlay Gradasi */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg border border-slate-100 dark:border-transparent">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-4 space-y-3">
            {/* Perubahan Light/Dark: Teks judul gradasi gelap di Light, gradasi terang di Dark */}
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>

            {/* Perubahan Light/Dark: Deskripsi slate-600 di Light */}
            <p className="text-slate-600 dark:text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-slate-500 dark:text-gray-500 text-sm">
                  Demo Not Available
                </span>
              )}

              {id ? (
                <Link
                  href={`/project/${id}`}
                  onClick={handleDetails}
                  // Perubahan Light/Dark: Tombol abu-abu muda di Light, transparan di Dark
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-slate-500 dark:text-gray-500 text-sm">
                  Details Not Available
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 dark:group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
