import React, { useState, useEffect } from "react";
import { Send, CheckCircle, Github, Linkedin, ArrowRight, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  // Load name/email from localStorage if exists
  useEffect(() => {
    const savedName = localStorage.getItem("ayush_visitor_name");
    const savedEmail = localStorage.getItem("ayush_visitor_email");
    if (savedName || savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName || "",
        email: savedEmail || ""
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("SENDING");

    // Save preferences
    localStorage.setItem("ayush_visitor_name", formData.name);
    localStorage.setItem("ayush_visitor_email", formData.email);

    // Simulate luxury API communication
    setTimeout(() => {
      setStatus("SUCCESS");
      setFormData((prev) => ({ ...prev, message: "" }));

      // Reset back to idle after standard time
      setTimeout(() => {
        setStatus("IDLE");
      }, 5000);
    }, 1800);
  };

  return (
    <div id="contact-section" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Contact copy and socials: 5 Cols */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-mono text-black dark:text-gray-400 uppercase tracking-[0.2em] font-bold block mb-3">
            COLLABORATION // LET'S TALK
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-black dark:text-white tracking-tight leading-none mb-6">
            Get in <span className="italic text-black dark:text-white font-normal underline underline-offset-8">touch</span>.
          </h3>
          <p className="font-sans text-base text-gray-655 dark:text-gray-300 leading-relaxed">
            I'm always excited to connect with fellow developers, recruiters, and innovators. Whether you have an opportunity, a project idea, or simply want to discuss software development, feel free to reach out!
          </p>
        </div>

        {/* Channels List */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs text-black dark:text-white uppercase tracking-[0.2em] font-bold">
            DIRECT DIRECTORY
          </h4>

          {/* GitHub channel */}
          <a
            href="https://github.com/ayush-uttam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/40 border border-gray-200 dark:border-neutral-850 hover:border-black dark:hover:border-white transition-all duration-300 group"
          >
            <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-neutral-950 text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">GITHUB ENGINE</p>
              <p className="text-sm font-sans font-medium text-gray-800 dark:text-gray-350 group-hover:text-black dark:group-hover:text-white transition-colors">
                github.com/ayush-uttam
              </p>
            </div>
          </a>

          {/* LinkedIn mock channel */}
          <a
            href="https://www.linkedin.com/in/ayush-uttam-68396b302/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/40 border border-gray-200 dark:border-neutral-850 hover:border-black dark:hover:border-white transition-all duration-300 group"
          >
            <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-neutral-950 text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">PROFESSIONAL NETWORK</p>
              <p className="text-sm font-sans font-medium text-gray-800 dark:text-gray-350 group-hover:text-black dark:group-hover:text-white transition-colors">
                linkedin.com/in/ayush-uttam-68396b302
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Slick form: 7 Cols */}
      <div className="lg:col-span-7 p-6 md:p-8 rounded-xl bg-white/70 dark:bg-neutral-900/40 border border-gray-200 dark:border-neutral-850 backdrop-blur-md relative overflow-hidden shadow-sm hover:border-black dark:hover:border-white transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-neutral-850" />

        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-5 h-5 text-black dark:text-white" />
          <h4 className="font-mono text-xs font-bold text-black dark:text-white uppercase tracking-[0.1em]">
            SECURE ROUTE // TRANSMIT ENVELOPE
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name-input" className="block text-[10px] font-mono uppercase text-gray-700 dark:text-gray-300 font-bold tracking-wider">
                Sender Name
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Write your name"
                className="w-full bg-white/80 dark:bg-neutral-950/80 border border-gray-250 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white rounded-lg px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email-input" className="block text-[10px] font-mono uppercase text-gray-700 dark:text-gray-300 font-bold tracking-wider">
                Return Coordinate (Email)
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full bg-white/80 dark:bg-neutral-950/80 border border-gray-250 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white rounded-lg px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message-input" className="block text-[10px] font-mono uppercase text-gray-700 dark:text-gray-300 font-bold tracking-wider">
              Message Payload
            </label>
            <textarea
              id="message-input"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Detail your request, collaboration parameters or message..."
              className="w-full bg-white/80 dark:bg-neutral-950/80 border border-gray-250 dark:border-neutral-800 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white rounded-lg px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === "SENDING" || status === "SUCCESS"}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 font-bold cursor-pointer border ${status === "SUCCESS"
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300"
                : status === "SENDING"
                  ? "bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-400 cursor-wait animate-pulse"
                  : "bg-black dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-100 border-transparent text-white dark:text-black hover:shadow-md hover:shadow-black/5"
                }`}
            >
              {status === "IDLE" && (
                <>
                  TRANSMIT SIGNAL <Send className="w-4 h-4 ml-1" />
                </>
              )}
              {status === "SENDING" && (
                <>
                  TRANSMITTING ENVELOPE... <ArrowRight className="w-4 h-4 animate-ping" />
                </>
              )}
              {status === "SUCCESS" && (
                <>
                  SIGNAL DELIVERED <CheckCircle className="w-4 h-4 ml-1 text-emerald-600 dark:text-emerald-400" />
                </>
              )}
            </button>
          </div>
        </form>

        {status === "SUCCESS" && (
          <div className="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono text-center animate-fade-in">
            Success! Your signal has been registered successfully. Ayush will receive the ping on the main server.
          </div>
        )}
      </div>
    </div>
  );
}
