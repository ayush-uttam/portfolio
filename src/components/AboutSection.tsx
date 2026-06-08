import { ExperienceItem, SkillCategory } from "../types";
import { Cpu, Terminal, Sparkles, Layers, Award } from "lucide-react";

const SKILLS: SkillCategory[] = [
  {
    title: "Core Technologies",
    items: ["TypeScript", "JavaScript", "Rust", "Go", "Python", "C++"]
  },
  {
    title: "Frameworks & Runtimes",
    items: ["React (Vite)", "Node.js", "Express", "Next.js", "Rocket (Rust)", "Gin (Go)"]
  },
  {
    title: "Databases & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase (Firestore)", "SQLite", "Prisma"]
  },
  {
    title: "Creative Tools & WebGL",
    items: ["Three.js", "Shaders (GLSL)", "WebGPU", "D3.js", "Framer Motion", "Tailwind CSS"]
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Software Engineer",
    company: "Autonomous Engineering Labs",
    period: "2024 - PRESENT",
    description: "Developing container workflows and WebGL node-graph generation pipelines. Optimized client rendering states reducing frame-drop by over 40% using raw structural buffers."
  },
  {
    id: "exp-2",
    role: "Creative Web Developer",
    company: "Synthesis Interactive",
    period: "2022 - 2024",
    description: "Engineered high-performance WebGL & Canvas integrations and customized interactive shaders for high-end boutique product marketing visuals. Designed fluid typography layout variables."
  },
  {
    id: "exp-3",
    role: "Open Source Contributor & Dev",
    company: "GitHub Community",
    period: "2020 - PRESENT",
    description: "Publishing and maintaining custom dev tools, small RPC servers, SQLite local-first synchronize wrappers, and responsive UI coordinates. Actively passionate about minimal high-performance systems."
  }
];

export default function AboutSection() {
  return (
    <div id="about-section" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Narrative Intro & Skills: 7 Cols */}
      <div className="lg:col-span-7 space-y-10">
        <div>
          <span className="text-xs font-mono text-black uppercase tracking-[0.2em] font-bold block mb-3">
            BIOGRAPHY // AYUSH UTTAM
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-black tracking-tight leading-none mb-6">
            Engineering digital experiences with <span className="italic block sm:inline text-black font-normal underline underline-offset-8">precision</span>.
          </h3>
          <div className="space-y-4 text-base text-gray-600 font-sans leading-relaxed">
            <p>
              I am a software engineer and creative developer specializing in robust full-stack software, WebGL, and high-performance user utilities. Based in the synthesis of architectural robustness and visual flow, I build software that runs rapidly and responds instantly.
            </p>
            <p>
              Applying structured type systems in TypeScript and high-performance algorithms in Rust, I craft user experiences that feel solid, clean, and completely reactive. My work rejects bloated layouts, prioritizing instead elegant minimalism and meticulous typography alignment.
            </p>
          </div>
        </div>

        {/* Skills Bento Block */}
        <div>
          <h4 className="font-mono text-xs text-black uppercase tracking-widest mb-6 flex items-center gap-2 font-bold">
            <Terminal className="w-4 h-4 text-black" /> Core Skillsets & Frameworks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS.map((cat, idx) => (
              <div
                key={cat.title}
                className="p-6 rounded-xl bg-white/70 border border-gray-200 hover:border-black transition-all duration-350 backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  {idx === 0 && <Cpu className="w-4 h-4 text-black opacity-60" />}
                  {idx === 1 && <Sparkles className="w-4 h-4 text-black opacity-60" />}
                  {idx === 2 && <Layers className="w-4 h-4 text-black opacity-60" />}
                  {idx === 3 && <Award className="w-4 h-4 text-black opacity-60" />}
                  <h5 className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                    {cat.title}
                  </h5>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-sans px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Timeline: 5 Cols */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-mono text-black uppercase tracking-[0.2em] font-bold block mb-3">
            JOURNEY // HISTORY
          </span>
          <h3 className="font-serif text-3xl font-semibold text-black tracking-tight">
            Work Experience
          </h3>
          <p className="font-sans text-sm text-gray-500 mt-1">
            A history of crafting high-impact software systems
          </p>
        </div>

        {/* Timeline Line container */}
        <div className="relative border-l border-gray-200 pl-6 ml-2 space-y-10 py-2">
          {EXPERIENCE.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border border-black bg-white group-hover:scale-125 group-hover:bg-black transition-all shadow-sm" />

              <div>
                <span className="text-[9px] font-mono tracking-widest text-white uppercase font-bold bg-black px-2.5 py-0.5 rounded-md mb-2 inline-block">
                  {item.period}
                </span>
                <h4 className="font-mono text-lg font-bold text-gray-900 group-hover:text-black transition-colors tracking-tight">
                  {item.role}
                </h4>
                <p className="font-mono text-xs text-gray-500 mt-0.5 font-bold uppercase tracking-widest">
                  {item.company}
                </p>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
