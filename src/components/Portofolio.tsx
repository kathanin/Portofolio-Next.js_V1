"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import { motion, AnimatePresence } from "framer-motion"; // Impor Framer Motion sebagai pengganti SwipeableViews
import { useTheme } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "./CardProject";
import TechStackIcon from "./TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "./Certificate";
import { Code, Award, Boxes } from "lucide-react";

interface Project {
  id: string | number;
  Img: string;
  Title: string;
  Description: string;
  Link: string;
}

interface CertificateData {
  id: string | number;
  Img: string;
}

interface ToggleButtonProps {
  onClick: () => void;
  isShowingMore: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  dir?: string;
}

// Perubahan Light/Dark: Warna tombol menyesuaikan tema
const ToggleButton: React.FC<ToggleButtonProps> = ({
  onClick,
  isShowingMore,
}) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "nextjs.svg", language: "NextJS" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "lottiefiles.svg", language: "LottieFiles" },
  { icon: "supabase.svg", language: "Supabase" },
  { icon: "laravel.svg", language: "Laravel" },
  { icon: "python.svg", language: "Python" },
  { icon: "flask.svg", language: "Flask" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "React" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "numpy.svg", language: "NumPy" },
  { icon: "pandas.svg", language: "Pandas" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "motion.svg", language: "Motion" },
  { icon: "vercel copy.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "scikit-learn.svg", language: "Scikit Learn" },
];

export default function FullWidthTabs() {
  const muiTheme = useTheme();

  // Deteksi tema saat ini untuk menyesuaikan Material UI
  const { theme: nextTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  const [value, setValue] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [showAllCertificates, setShowAllCertificates] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menentukan apakah mode gelap aktif
  const currentTheme = nextTheme === "system" ? systemTheme : nextTheme;
  const isDark = !mounted || currentTheme === "dark"; // Default dark saat belum mounted

  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase
          .from("certificates")
          .select("*")
          .order("id", { ascending: true }),
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      setProjects(projectsResponse.data || []);
      setCertificates(certificatesResponse.data || []);

      localStorage.setItem(
        "projects",
        JSON.stringify(projectsResponse.data || []),
      );
      localStorage.setItem(
        "certificates",
        JSON.stringify(certificatesResponse.data || []),
      );
    } catch (error: any) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }
    fetchData();
  }, [fetchData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type: "projects" | "certificates") => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  if (!mounted) return null;

  return (
    // Perubahan Light/Dark: Latar belakang bg-transparent dan text menyesuaikan
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-transparent text-slate-800 dark:text-white overflow-hidden"
      id="Portofolio"
    >
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
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
            Portfolio Showcase
          </span>
        </h2>
        {/* Perubahan Light/Dark: text-slate-600 untuk light mode */}
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            // Perubahan Light/Dark: Border menyesuaikan tema
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                // Perubahan Light/Dark: Warna teks tab tidak aktif
                color: isDark ? "#94a3b8" : "#64748b",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&&:hover": {
                  color: isDark ? "#ffffff" : "#0f172a",
                  backgroundColor: isDark
                    ? "rgba(139, 92, 246, 0.1)"
                    : "rgba(139, 92, 246, 0.05)",
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: isDark ? "#fff" : "#4338ca",
                  background: isDark
                    ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))"
                    : "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                  boxShadow: isDark
                    ? "0 4px 15px -3px rgba(139, 92, 246, 0.2)"
                    : "0 4px 15px -3px rgba(139, 92, 246, 0.1)",
                  "& .lucide": { color: isDark ? "#a78bfa" : "#6366f1" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab
              icon={
                <Code className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Award className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        {/* Pengganti SwipeableViews menggunakan Framer Motion */}
        <Box sx={{ mt: 4 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {value === 0 && (
                <TabPanel value={value} index={0} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                      {displayedProjects.map((project, index) => (
                        <div
                          key={project.id || index}
                          data-aos={
                            index % 3 === 0
                              ? "fade-up-right"
                              : index % 3 === 1
                                ? "fade-up"
                                : "fade-up-left"
                          }
                          data-aos-duration={
                            index % 3 === 0
                              ? "1000"
                              : index % 3 === 1
                                ? "1200"
                                : "1000"
                          }
                        >
                          <CardProject
                            Img={project.Img}
                            Title={project.Title}
                            Description={project.Description}
                            Link={project.Link}
                            id={project.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {projects.length > initialItems && (
                    <div className="mt-6 w-full flex justify-start">
                      <ToggleButton
                        onClick={() => toggleShowMore("projects")}
                        isShowingMore={showAllProjects}
                      />
                    </div>
                  )}
                </TabPanel>
              )}

              {value === 1 && (
                <TabPanel value={value} index={1} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                      {displayedCertificates.map((certificate, index) => (
                        <div
                          key={certificate.id || index}
                          data-aos={
                            index % 3 === 0
                              ? "fade-up-right"
                              : index % 3 === 1
                                ? "fade-up"
                                : "fade-up-left"
                          }
                          data-aos-duration={
                            index % 3 === 0
                              ? "1000"
                              : index % 3 === 1
                                ? "1200"
                                : "1000"
                          }
                        >
                          <Certificate ImgSertif={certificate.Img} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {certificates.length > initialItems && (
                    <div className="mt-6 w-full flex justify-start">
                      <ToggleButton
                        onClick={() => toggleShowMore("certificates")}
                        isShowingMore={showAllCertificates}
                      />
                    </div>
                  )}
                </TabPanel>
              )}

              {value === 2 && (
                <TabPanel value={value} index={2} dir={muiTheme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                      {techStacks.map((stack, index) => (
                        <div
                          key={index}
                          data-aos={
                            index % 3 === 0
                              ? "fade-up-right"
                              : index % 3 === 1
                                ? "fade-up"
                                : "fade-up-left"
                          }
                          data-aos-duration={
                            index % 3 === 0
                              ? "1000"
                              : index % 3 === 1
                                ? "1200"
                                : "1000"
                          }
                        >
                          <TechStackIcon
                            TechStackIcon={stack.icon}
                            Language={stack.language}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </div>
  );
}
