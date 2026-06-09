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
    role: "Started B.Tech CSE",
    company: "Information Technology",
    period: "2024",
    description: "• Started B.Tech in Computer Science Engineering (CSE)\n• Initiated exploration of system programming and basic computing theory\n• Engaged in campus dev circles and student developer chapters"
  },
  {
    id: "exp-2",
    role: "Focused on Java and DSA",
    company: "Deep Algorithmic Foundations",
    period: "2025",
    description: "• Focused heavily on Java programming and deep object-oriented principles\n• Mastered core Data Structures & Algorithms (DSA)\n• Built robust algorithmic foundations through constant competitive problem-solving"
  },
  {
    id: "exp-3",
    role: "Developed Low-Voltage-breakage detection system",
    company: "Hardware + Software collaboration",
    period: "2025",
    description: "• Developed a real-time fault detection system using C++ and NodeMCU to identify AC line breakage\n• Optimized the detection algorithm, reducing fault identification time from hours to under 5 seconds.\n• Secured 1st place among 60+ teams at VytoHackClash Hackathon for presenting the solution."
  },
  {
    id: "exp-4",
    role: "Built GigshieldAI & Sentinel AI",
    company: "Practical Systems & Backend Focus",
    period: "2026",
    description: "• Built Gigshield AI (AI-Powered Parametric Insurance Platform )\n• Built Sentinel AI (flagship AI-powered code authenticity platform)\n• Started Backend Development using high-throughput Node.js & Express architectures"
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
          <ul className="space-y-3 text-base text-gray-600 font-sans leading-relaxed font-light list-disc list-outside pl-5">
            <li>
              <strong>Academic Foundation:</strong> Information Technology undergraduate at G.L. Bajaj Institute of Technology and Management with a strong foundation in Data Structures, Algorithms, Web Development, and AI-powered applications.
            </li>
            <li>
              <strong>Technical Proficiencies:</strong> Skilled in C++, Java, Python, JavaScript, React.js, Node.js, and modern cloud platforms.
            </li>
            <li>
              <strong>Full-Stack & Systems:</strong> Experienced in building full-stack applications, AI-integrated platforms, and IoT-based hardware/software systems.
            </li>
            <li>
              <strong>API & Cloud Scale:</strong> Demonstrated ability to design scalable solutions leveraging OpenAI, Gemini APIs, Firebase, Supabase, and AWS.
            </li>
            <li>
              <strong>Key Achievements:</strong> Secured 1st place among 60+ teams at the VytoHackClash Hackathon.
            </li>
            <li>
              <strong>Passions:</strong> Passionate about software engineering, competitive programming, and leveraging AI models to solve real-world problems.
            </li>
          </ul>
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
          <p className="font-sans text-sm text-gray-500 mt-1">
            A timeline of academic milestones, hackathons, and software projects
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
                <p className="font-sans text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-line">
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
