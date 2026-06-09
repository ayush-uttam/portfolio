import React, { useState, useEffect, useRef } from "react";
import Background3D from "./components/Background3D";
import InteractiveTitle3D from "./components/InteractiveTitle3D";
import CustomCursor from "./components/CustomCursor";
import ProjectList from "./components/ProjectList";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [systemTime, setSystemTime] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Update real system clock in UTC formats
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: HH:MM:SS UTC
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setSystemTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer to trigger exact navbar highlighting & Background3D changes
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when centered in viewport
      threshold: 0.1,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    const targets = [heroRef, projectsRef, aboutRef, contactRef];
    targets.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      targets.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-white text-black overflow-x-hidden selection:bg-black selection:text-white">
      {/* Cursor & Click Effects */}
      <CustomCursor />

      {/* ThreeJS Dynamic Interactive backdrop */}
      <Background3D scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Subtle top ambient grids */}
      <div className="absolute top-0 inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 flex justify-between items-center backdrop-blur-md bg-white/70">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-serif tracking-tight font-bold text-black text-base md:text-lg">
              AYUSH UTTAM
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                ACTIVE FOR PROJECTS
              </span>
            </div>
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollToRef(heroRef)}
            className={`text-xs font-mono px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeSection === "home"
              ? "bg-black text-white font-bold"
              : "hover:text-black text-gray-500 px-4 py-1.5"
              }`}
          >
            INDEX // HOME
          </button>
          <button
            onClick={() => scrollToRef(projectsRef)}
            className={`text-xs font-mono px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeSection === "projects"
              ? "bg-black text-white font-bold"
              : "hover:text-black text-gray-500 px-4 py-1.5"
              }`}
          >
            FEED // PROJECTS
          </button>
          <button
            onClick={() => scrollToRef(aboutRef)}
            className={`text-xs font-mono px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeSection === "about"
              ? "bg-black text-white font-bold"
              : "hover:text-black text-gray-500 px-4 py-1.5"
              }`}
          >
            DOSSIER // ABOUT
          </button>
          <button
            onClick={() => scrollToRef(contactRef)}
            className={`text-xs font-mono px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeSection === "contact"
              ? "bg-black text-white font-bold"
              : "hover:text-black text-gray-500 px-4 py-1.5"
              }`}
          >
            SIGNAL // CONTACT
          </button>
        </nav>

        {/* Time and Links */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">LOCAL TIMESTAMP</span>
            <span className="text-[11px] font-mono text-gray-700 font-medium">{systemTime || "12:00:00 UTC"}</span>
          </div>

          <a
            href="https://github.com/ayush-uttam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-full border border-gray-200 hover:border-black bg-white/80 text-gray-650 hover:text-black transition-all shadow-sm"
            title="Ayush Uttam's GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Single Page Layout Container */}
      <main className="relative z-20">
        {/* Section 1: Hero Welcome Landing */}
        <section
          id="home"
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-20 relative select-none"
        >
          {/* Main Hero Bento Frame */}
          <div className="max-w-5xl w-full text-center space-y-8 md:space-y-12 py-10">
            {/* Giant iOS / Playfair Bold Typography */}
            <div className="relative overflow-visible py-2">
              <span className="sr-only">AYUSH Uttam</span>
              <InteractiveTitle3D />
            </div>

            {/* Sub-description subtitle */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="font-sans text-base md:text-lg text-gray-650 leading-relaxed font-light">
                Information Technology undergraduate with strong skills in C++, JavaScript, React.js, Node.js, and AI-powered application development. Experienced in building full-stack and IoT solutions, with a proven track record of delivering innovative projects and winning hackathon competitions.
              </p>

              {/* Action Callouts */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => scrollToRef(projectsRef)}
                  className="px-6 py-2.5 rounded-lg bg-black hover:bg-neutral-900 font-mono text-xs tracking-wider uppercase font-bold text-white transition-all hover:shadow-lg hover:shadow-black/5 active:translate-y-0.5 cursor-pointer"
                >
                  VIEW REPOSITORIES
                </button>
                <button
                  onClick={() => scrollToRef(contactRef)}
                  className="px-6 py-2.5 rounded-lg border border-gray-200 hover:border-black bg-white/80 hover:bg-gray-50 font-mono text-xs tracking-wider uppercase font-bold text-black transition-all cursor-pointer"
                >
                  TRANSMIT SIGNAL
                </button>
              </div>
            </div>
          </div>


        </section>

        {/* Section 3: Dynamic Feed Projects */}
        <section
          id="projects"
          ref={projectsRef}
          className="min-h-screen py-24 w-full"
        >
          <ProjectList />
        </section>

        {/* Section 4: Dossier About */}
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-150"
        >
          <AboutSection />
        </section>

        {/* Section 5: Signal Contact */}
        <section
          id="contact"
          ref={contactRef}
          className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-150"
        >
          <ContactSection />
        </section>
      </main>

      {/* Handcrafted Footer */}
      <footer className="relative z-20 border-t border-gray-150 bg-gray-50 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif tracking-tight font-bold text-black text-base">
              AYUSH UTTAM
            </span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              HANDCRAFTED IN MINIMAL METROPOLIS © 2026
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ayush-uttam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-200 bg-white hover:border-black text-gray-500 hover:text-black rounded-lg transition-all"
              title="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-uttam-68396b302/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-200 bg-white hover:border-black text-gray-500 hover:text-black rounded-lg transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

