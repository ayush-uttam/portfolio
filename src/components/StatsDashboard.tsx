import { Star, GitBranch, Terminal, Cpu } from "lucide-react";

export default function StatsDashboard() {
  return (
    <div id="stats-dashboard" className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {/* Stat 1: Commits / Productivity */}
      <div className="p-6 rounded-xl bg-white/70 border border-gray-200 hover:border-black transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 font-bold">COMMIT ENG.</p>
          <Cpu className="w-4 h-4 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4">
          <p className="font-serif text-3xl md:text-4xl text-black font-extrabold tracking-tight">
            1,400+
          </p>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">COMMITS PER YEAR</p>
        </div>
      </div>

      {/* Stat 2: Projects completed */}
      <div className="p-6 rounded-xl bg-white/70 border border-gray-200 hover:border-black transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 font-bold">REPOS COM.</p>
          <GitBranch className="w-4 h-4 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4">
          <p className="font-serif text-3xl md:text-4xl text-black font-extrabold tracking-tight">
            32
          </p>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">PUBLIC SOURCE</p>
        </div>
      </div>

      {/* Stat 3: Star Counter */}
      <div className="p-6 rounded-xl bg-white/70 border border-gray-200 hover:border-black transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 font-bold">STAR ENGINE</p>
          <Star className="w-4 h-4 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4">
          <p className="font-serif text-3xl md:text-4xl text-black font-extrabold tracking-tight">
            640+
          </p>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">STARS EARNED</p>
        </div>
      </div>

      {/* Stat 4: Architecture Health */}
      <div className="p-6 rounded-xl bg-white/70 border border-gray-200 hover:border-black transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 font-bold">STB RATE</p>
          <Terminal className="w-4 h-4 text-black opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4">
          <p className="font-serif text-3xl md:text-4xl text-black font-extrabold tracking-tight">
            99.9%
          </p>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">BUILD STABILITY</p>
        </div>
      </div>
    </div>
  );
}
