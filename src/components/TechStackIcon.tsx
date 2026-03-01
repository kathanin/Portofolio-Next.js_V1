import React from "react";

interface TechStackIconProps {
  TechStackIcon: string;
  Language: string;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({
  TechStackIcon,
  Language,
}) => {
  return (
    // Perubahan Light/Dark: Latar putih terang dengan border di Light Mode, slate-800 di Dark Mode
    <div className="group p-6 rounded-2xl bg-white/80 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-transparent transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 blur transition duration-300"></div>
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      {/* Perubahan Light/Dark: Teks abu-abu gelap di Light Mode, putih di Dark Mode */}
      <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-purple-600 dark:group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
