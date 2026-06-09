import { useState } from "react";
import { 
  ExternalLink, 
  Code, 
  ArrowRight, 
  Github, 
  Layers 
} from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
}

interface CustomProject {
  id: string;
  name: string;
  githubName: string;
  tagline: string;
  category: string;
  description: string;
  readmeGist: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  majorSpecs: SpecItem[];
  colorTheme: string;
}

const FEATURED_PROJECTS: CustomProject[] = [
  {
    id: "sentinel-ai",
    name: "Sentinel AI",
    githubName: "ai-code-detector",
    tagline: "Forensic academic integrity auditing suite to inspect public student GitHub repositories for AI-generated code.",
    category: "ACADEMIC INTEGRITY // SECURE AUDITING",
    description: "Sentinel AI is a modern forensic analysis platform designed for educators to audit public student GitHub repositories for AI-generated code patterns. It parses structures, scans commit histories, and runs deep style inspections to flag structural irregularities, over-explained comments, and machine-generated templates.",
    readmeGist: [
      "Secure Google Auth Gating: Educators log in securely; their work is isolated in a private database.",
      "Multi-LLM Dual Support: Seamlessly toggle between Google Gemini and OpenAI models for dual verification.",
      "Dynamic Statistics Dashboard: Visualize class risk distributions, averages, and anomalies.",
      "Interactive Reports & Code Walkthrough: Real-time line-by-line annotations detailing suspected AI constructs."
    ],
    techStack: ["TypeScript", "Google Gemini API", "OpenAI API", "Firebase", "Node.js", "Express", "React", "Vercel"],
    githubUrl: "https://github.com/ayush-uttam/ai-code-detector",
    demoUrl: "https://ai-code-detector-xi.vercel.app/",
    majorSpecs: [
      { label: "DASHBOARD LATENCY", value: "< 180ms" },
      { label: "DETECTION CAPABILITY", value: "Multi-LLM verification" },
      { label: "SUPPORTED PROV", value: "Gemini & OpenAI" }
    ],
    colorTheme: "rose"
  },
  {
    id: "fault-detector",
    name: "ESP-NOW Fault Grid",
    githubName: "Real-Time-Low-Voltage-Line-Fault-Detection-System",
    tagline: "Distributed IoT telemetry system for real-time monitoring of low-voltage power distribution networks.",
    category: "IOT SYSTEMS // WIRELESS GRID",
    description: "A distributed IoT-based fault detection system designed for real-time monitoring of low-voltage power distribution lines. It uses ESP8266-based sensing nodes to measure and transmit RMS current readings wirelessly via ESP-NOW to a central hub.",
    readmeGist: [
      "Real-time current monitoring & RMS current measurement calculated locally on node microcontrollers.",
      "Wireless node-to-node communication using ESP-NOW (distributed sensing architecture, zero-WiFi dependent).",
      "Automatic fault localization with threshold-based decision logic and relay control for path isolation.",
      "Web-based monitoring dashboard for live fault status, system health, and Telegram alerts notification."
    ],
    techStack: ["C++", "ESP8266 Core", "ESP-NOW", "Arduino IDE", "WiFi", "SD Card Library", "Telegram Bot API"],
    githubUrl: "https://github.com/ayush-uttam/Real-Time-Low-Voltage-Line-Fault-Detection-System",
    majorSpecs: [
      { label: "TRANSMIT PROTOCOL", value: "ESP-NOW (Zero WiFi)" },
      { label: "COMMUNICATION NODE", value: "Multi-Node ESP8266" },
      { label: "RESPONSE LATENCY", value: "Real-time Thresholding" }
    ],
    colorTheme: "amber"
  },
  {
    id: "gigshield",
    name: "SafeRideAI",
    githubName: "Al-powered-insurance-for-gig-workers",
    tagline: "AI-powered parametric income insurance platform for gig delivery workers protecting against external disruptions.",
    category: "INSURTECH // PARAMETRIC AI",
    description: "safeRideAI is an AI-powered parametric insurance platform that transforms traditional insurance into a fully automated, event-driven system. It protects gig delivery workers from income loss caused by weather, heavy rain, high AQI, and curfews.",
    readmeGist: [
      "Parametric Automation: Automatically triggers claims based on weather, AQI, and government alert APIs.",
      "Zero-touch claim system: Automatically processes claims and instantly payouts lost income via Razorpay UPI.",
      "Adversarial Defense System: Behavior tracking (GPS + motion data) and geo-location checks to prevent fraud.",
      "Weekly Pricing Model: Custom subscription model adjusting risk parameters dynamically based on local weather."
    ],
    techStack: ["React.js", "Node.js", "Supabase", "Python", "Scikit-Learn", "Razorpay API"],
    githubUrl: "https://github.com/ayush-uttam/Al-powered-insurance-for-gig-workers",
    demoUrl: "https://saferide-mu.vercel.app/",
    majorSpecs: [
      { label: "CLAIM PROCESSING", value: "Parametric Instant" },
      { label: "FRAUD DEFENSE", value: "GPS Anomaly Detection" },
      { label: "RISK MODEL", value: "Machine Learning (ML)" }
    ],
    colorTheme: "emerald"
  }
];

function SentinelAIMockup() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #1a0a2e 100%)" }}
    >
      {/* Shield Icon */}
      <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-1.5">
        <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>

      {/* Title */}
      <div className="text-[8px] font-bold text-white tracking-wide mb-0.5">
        <span className="font-black">SENTINEL AI</span>{" "}
        <span className="font-light italic text-neutral-300">Academic</span>
      </div>
      <div className="text-[5.5px] text-neutral-500 leading-tight max-w-[140px] mb-2">
        Verify programming academic integrity. Analyze student GitHub repositories using LLM forensic modeling.
      </div>

      {/* Feature Bullets */}
      <div className="w-full max-w-[150px] space-y-1 text-left mb-2">
        {[
          { icon: "👤", title: "Educator Workspace", desc: "Upload class registers, persist scans" },
          { icon: "🔑", title: "Gemini Control", desc: "Supply your own API keys" },
          { icon: "🔒", title: "Zero-Trust Security", desc: "Isolated Firestore boundaries" },
        ].map((f) => (
          <div key={f.title} className="flex items-start gap-1">
            <span className="text-[6px] mt-0.5">{f.icon}</span>
            <div>
              <div className="text-[6px] font-bold text-white">{f.title}</div>
              <div className="text-[5px] text-neutral-500 leading-tight">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sign In Button */}
      <div className="w-[120px] py-1 rounded-full bg-cyan-500 text-[6px] font-bold text-white tracking-wide mb-1">
        →  Sign in with Google
      </div>
      <div className="text-[5px] text-neutral-600 italic">
        Made by <span className="text-neutral-400">Ayush</span> & <span className="text-neutral-400">Anuj</span>
      </div>
    </div>
  );
}

function ESPNowMockup() {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[9px] text-neutral-300">
      <div className="bg-neutral-950 p-2 rounded border border-neutral-800 h-[120px] flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-1 text-amber-400 font-bold">
          <span>ESP-NOW CURRENT MONITOR</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        </div>
        
        {/* Wave graph */}
        <svg className="w-full h-[40px] opacity-70 my-1" viewBox="0 0 100 30">
          <path d="M 0,15 Q 12.5,5 25,15 T 50,15 T 75,15 T 100,15" fill="none" stroke="#f59e0b" strokeWidth="1" />
          <path d="M 0,15 Q 12.5,25 25,15 T 50,15 T 75,30 T 100,15" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        <div className="text-[7.5px] space-y-0.5 border-t border-neutral-850/50 pt-1 text-neutral-400">
          <div className="flex justify-between">
            <span>NODE 01 (SOURCE)</span>
            <span className="text-emerald-400 font-bold">3.20A // OK</span>
          </div>
          <div className="flex justify-between">
            <span>NODE 02 (CONSUMER)</span>
            <span className="text-rose-500 font-bold">0.02A // FAULT DETECTED</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 border-t border-neutral-850 pt-2 text-[8px]">
        <div className="flex flex-col">
          <span className="text-neutral-500">RELAY CONTROL</span>
          <span className="text-rose-500 font-bold text-xs">ISOLATED // OPEN</span>
        </div>
        <span className="px-1.5 py-0.5 bg-amber-500/25 text-amber-400 rounded border border-amber-500/35">SYS_ALERT</span>
      </div>
    </div>
  );
}

function SafeRideMockup() {
  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[9px] text-neutral-300">
      <div className="bg-neutral-950 p-2 rounded border border-neutral-800 h-[120px] space-y-1 overflow-hidden text-[7.5px] leading-tight">
        <div className="flex justify-between items-center border-b border-neutral-850 pb-1 text-emerald-400 font-bold">
          <span>PARAMETRIC ORACLE FEED</span>
          <span className="animate-pulse text-emerald-400">● LIVE_FEED</span>
        </div>
        <div className="space-y-0.5">
          <div className="flex justify-between">
            <span className="text-neutral-500">DISRUPTION STATUS:</span>
            <span className="text-rose-400 font-bold">HEAVY RAIN (18mm/hr)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">ZONE LOCKOUT:</span>
            <span className="text-rose-400">Delhi-NCR North (Active)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">GEO-COORD GPS CHECK:</span>
            <span className="text-emerald-400">VERIFIED PASS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">ADVERSARIAL FRAUD SCAN:</span>
            <span className="text-emerald-400">NO ANOMALIES</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 border-t border-neutral-850 pt-2 text-[8px]">
        <div className="flex flex-col">
          <span className="text-neutral-500">AUTO CLAIM PAYMENT</span>
          <span className="text-emerald-400 font-bold text-xs">Razorpay Payout Pushed</span>
        </div>
        <span className="px-1.5 py-0.5 bg-emerald-500/25 text-emerald-400 rounded border border-emerald-500/35">PAID</span>
      </div>
    </div>
  );
}

export default function ProjectList() {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  };

  return (
    <div id="projects-section" className="w-full py-10 selection:bg-black selection:text-white overflow-x-hidden">
      {/* Structural Title Section */}
      <div className="mb-10 border-b border-gray-100 pb-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
              <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">
                Verified Repositories
              </span>
            </div>
            <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black font-black tracking-tight uppercase">
              ENGINEERED PROJECTS
            </h3>
            <p className="font-sans text-sm md:text-base text-gray-500 mt-2 max-w-2xl leading-relaxed">
              Correct and verified specifications retrieved directly from official codebase README records. Click peeking side card borders or tab selectors to cycle.
            </p>
          </div>

          {/* Cyclic Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 font-mono">
            <button
              onClick={prevProject}
              className="p-3 border border-gray-200 hover:border-black rounded-xl bg-white hover:bg-neutral-50 transition-all cursor-pointer select-none active:scale-95 group/nav"
              title="Previous Project (Cyclic)"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs transition-transform group-hover/nav:-translate-x-0.5">←</span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-500 group-hover/nav:text-black">PREV</span>
              </div>
            </button>
            <button
              onClick={nextProject}
              className="p-3 border border-gray-200 hover:border-black rounded-xl bg-white hover:bg-neutral-50 transition-all cursor-pointer select-none active:scale-95 group/nav"
              title="Next Project (Cyclic)"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-500 group-hover/nav:text-black">NEXT</span>
                <span className="text-xs transition-transform group-hover/nav:translate-x-0.5">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Project Quick Tabs Selector */}
        <div className="flex flex-wrap gap-2 mt-8">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectIdx(idx)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border rounded-lg transition-all duration-300 ${
                activeProjectIdx === idx
                  ? "bg-black text-white border-black shadow"
                  : "bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {proj.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cyclic Horizontal Scroll Track Carriage */}
      <div className="relative w-full overflow-hidden py-4 h-[760px] sm:h-[700px] lg:h-[580px] xl:h-[530px]">
        {/* Slider Carriage */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Inject CSS custom variables to compute responsive widths dynamically in translation */}
          <span className="hidden">
            <style>{`
              :root {
                --card-width: 78vw;
                --card-gap: 12px;
              }
              @media (min-width: 640px) {
                :root {
                  --card-width: 74vw;
                  --card-gap: 20px;
                }
              }
              @media (min-width: 1024px) {
                :root {
                  --card-width: 64vw;
                  --card-gap: 32px;
                }
              }
              @media (min-width: 1280px) {
                :root {
                  --card-width: 58vw;
                  --card-gap: 32px;
                }
              }
            `}</style>
          </span>

          {FEATURED_PROJECTS.map((project, idx) => {
            const isSelected = activeProjectIdx === idx;
            
            // Calculate cyclic offset wrapped inside [-1, 1] for 3 items
            let diff = idx - activeProjectIdx;
            if (diff > 1) diff -= 3;
            if (diff < -1) diff += 3;

            return (
              <div
                key={project.id}
                onClick={() => !isSelected && setActiveProjectIdx(idx)}
                className={`group absolute top-0 bottom-0 flex flex-col justify-between p-5 md:p-6 bg-white border rounded-2xl shrink-0 select-none ${
                  isSelected
                    ? "border-black/60 shadow-xl shadow-black/5 z-10 opacity-100"
                    : "border-gray-200/80 opacity-40 hover:opacity-75 hover:border-gray-400 cursor-pointer z-0 blur-[0.4px]"
                }`}
                style={{
                  transform: `translate3d(calc(-50% + ${diff} * (var(--card-width) + var(--card-gap))), 0, 0) scale(${isSelected ? 1 : 0.92})`,
                  width: "var(--card-width)",
                  left: "50%",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, filter 0.6s ease"
                }}
              >
                {/* Subtle Accent Radial Glow for Selected Card */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-neutral-50 to-transparent opacity-60 pointer-events-none rounded-tr-2xl" />
                )}

                {/* Adaptive Indicator for Side Cards */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                    <span className="font-mono text-xs text-gray-400 bg-white border border-gray-150 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>Click to view</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-1 min-h-0">
                  {/* Part 1: Metadata Stats & Telemetry Column (7 Columns) */}
                  <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 border-gray-150 pb-6 lg:pb-0 lg:pr-8 relative lg:after:absolute lg:after:content-[''] lg:after:top-0 lg:after:bottom-6 lg:after:right-0 lg:after:w-[1px] lg:after:bg-gray-150">
                    <div>
                      {/* Tag Category Pill */}
                      <div className="inline-block text-[10px] font-mono tracking-widest uppercase text-gray-450 mb-3 bg-gray-50/80 border border-gray-200 px-2.5 py-1 rounded-full">
                        {project.category}
                      </div>

                      {/* Project Title */}
                      <h4 className="font-sans text-xl sm:text-2xl font-black text-black tracking-tight leading-tight uppercase">
                        {project.name}
                      </h4>
                      <p className="font-mono text-[9px] sm:text-[10px] text-gray-400 mt-0.5 mb-4 lowercase">
                        {project.githubName} // repository
                      </p>

                      <p className="font-sans text-gray-550 text-xs lg:text-[13px] leading-relaxed mb-3">
                        {project.description}
                      </p>

                      {/* Built with techs */}
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Code className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-mono text-[9px] text-gray-455 uppercase tracking-widest">
                            Built with Stack
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] bg-black/[0.03] text-black border border-black/[0.08] hover:border-black/50 px-2 py-0.5 rounded-md transition-all"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Compact Specs Bento Panel */}
                    <div className="space-y-1.5 bg-neutral-50/80 rounded-xl p-2.5 border border-gray-200/60 font-mono mt-2">
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1 border-b border-gray-150 pb-1 flex items-center justify-between">
                        <span>Telemetry Specs</span>
                        {isSelected && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {project.majorSpecs.map((spec, i) => (
                          <div key={i} className="flex flex-col text-[10px]">
                            <span className="text-gray-400 uppercase text-[8px] tracking-wider">{spec.label}</span>
                            <span className="font-semibold text-black truncate mt-0.5">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Website Snapshot Column (5 Columns) */}
                  <div className="lg:col-span-5 flex flex-col justify-center py-6 lg:py-0 lg:pl-4">
                    <div className="w-full flex flex-col justify-center">
                      <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Dashboard Preview</span>
                      </div>

                      {/* Browser Mockup Window */}
                      {project.id === "sentinel-ai" ? (
                        <div className="w-full h-[180px] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-lg relative flex items-center justify-center">
                          <img 
                            src="/sentinel-ai-screenshot.png" 
                            alt="Sentinel AI Academic Integrity Audit Suite" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : project.id === "gigshield" ? (
                        <div className="w-full h-[180px] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-lg relative flex items-center justify-center">
                          <img 
                            src="/saferide-screenshot.png" 
                            alt="SafeRideAI Parametric Insurance Suite" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[180px] bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-lg flex flex-col">
                          {/* Browser header tab */}
                          <div className="h-6 bg-neutral-950 px-3 flex items-center justify-between border-b border-neutral-850 flex-shrink-0">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/85" />
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/85" />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/85" />
                            </div>
                            <div className="bg-neutral-900 text-[7.5px] font-mono text-neutral-500 px-3 py-0.5 rounded border border-neutral-800/60 truncate max-w-[160px]">
                              {project.id === "fault-detector" && "telemetry-node.local"}
                            </div>
                            <div className="w-6" />
                          </div>
                          
                          {/* Browser body / mock content */}
                          <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden relative bg-neutral-900">
                            {project.id === "fault-detector" && <ESPNowMockup />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spanning Footer Row */}
                <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 flex-shrink-0">
                  <div className="font-mono text-[9px] text-gray-400">
                    STATUS // INTEGRATED DEPLOYMENT
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Source Button */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !isSelected && e.preventDefault()} // prevent redirection when sliding side cards
                      className="group/btn inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase border border-gray-200 hover:border-black transition-all duration-350 cursor-pointer shadow-sm hover:shadow-black/5 text-center"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View source</span>
                      <ExternalLink className="w-3 h-3 text-black/50" />
                    </a>

                    {/* Live Demo Button (only if demoUrl exists) */}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => !isSelected && e.preventDefault()}
                        className="group/btn inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase border border-black hover:bg-neutral-900 transition-all duration-350 cursor-pointer shadow hover:shadow-black/10 text-center"
                      >
                        <span>Live demo</span>
                        <ExternalLink className="w-3 h-3 text-white/75" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cyclic Bullet Indicators at footer */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:hidden pb-4">
        <button onClick={prevProject} className="p-2 border border-gray-200 rounded-lg text-xs bg-white">←</button>
        {FEATURED_PROJECTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveProjectIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeProjectIdx === idx ? "bg-black scale-110" : "bg-gray-200"
            }`}
          />
        ))}
        <button onClick={nextProject} className="p-2 border border-gray-200 rounded-lg text-xs bg-white">→</button>
      </div>
    </div>
  );
}
