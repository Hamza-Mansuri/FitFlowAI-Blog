import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaListUl, FaTimes, FaChevronRight } from "react-icons/fa";

const SECTIONS = [
  { id: "hero", label: "Home Hub" },
  { id: "flow-experience", label: "Dynamic Flow Experience" },
  { id: "philosophy", label: "Bridging Complex Sports Science and Daily Healthy Routines" },
  { id: "testimonials", label: "Trusted by Fitness Enthusiasts" },
  { id: "featured-stories", label: "Featured Stories" },
  { id: "latest-articles", label: "Learn From Fitness Experts" },
  { id: "strongest-self", label: "Start Building Your Strongest Self Today" }
];

export function ScrollSpyNav() {
  const [activeId, setActiveId] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor active sections in the viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px", // Trigger when section occupies the active reading area
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        // Only trigger via observer if we are not at the very top of the page
        if (entry.isIntersecting && window.scrollY >= 120) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    // Monitor global page scroll progress for the vertical bar indicator
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveId("hero");
      }
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Header offset clearance (navbar height is approx 90px)
    const offset = 90;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* DESKTOP/TABLET VERTICAL SCROLL SPY PANEL */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-row items-center gap-4 z-40 select-none pointer-events-none"
      >
        <div className="relative flex flex-col gap-6 p-4 py-8 rounded-full bg-gradient-to-b from-emerald-50/60 via-white/80 to-blue-50/60 backdrop-blur-xl border border-emerald-500/10 shadow-[0_20px_40px_rgba(16,185,129,0.06)] items-center pointer-events-auto">
          {/* Vertical scroll progress track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[3px] bg-slate-100 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-emerald-500 via-teal-400 to-blue-500 origin-top transition-all duration-75"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <div
                key={section.id}
                className="group relative flex items-center justify-center h-6 w-6 cursor-pointer"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Jump to ${section.label}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && scrollToSection(section.id)}
              >
                {/* Horizontal Tooltip Label on Hover */}
                <div className="absolute right-9 scale-90 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-right whitespace-nowrap bg-slate-900 text-white text-[10px] font-extrabold px-3.5 py-2 rounded-xl shadow-md uppercase tracking-wider">
                  {section.label.length > 32 ? section.label.substring(0, 28) + "..." : section.label}
                </div>

                {/* Circular Active Dot Indicator */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.35 : 1.0,
                  }}
                  className={`relative z-10 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "h-3.5 w-3.5 bg-gradient-to-br from-emerald-500 to-teal-400 border-2 border-white shadow-[0_0_15px_rgba(16,185,129,0.7)]" 
                      : "h-2 w-2 bg-slate-300 group-hover:bg-slate-400"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* MOBILE FLOATING JUMP BUTTON */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 bg-slate-900 text-white shadow-xl px-5 py-3.5 rounded-full border border-slate-800 text-xs font-black uppercase tracking-wider cursor-pointer"
        >
          <FaListUl size={12} className="text-emerald-500" />
          <span>Jump to Section</span>
        </motion.button>
      </div>

      {/* MOBILE BOTTOM SHEET MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black z-45"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="md:hidden fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] bg-white border-t border-slate-205 shadow-2xl z-50 p-6 pb-10 flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Quick Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition cursor-pointer"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Navigation Items List */}
              <div className="flex flex-col gap-1.5">
                {SECTIONS.map((section, idx) => {
                  const isActive = activeId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 w-full cursor-pointer ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-700 font-extrabold border border-emerald-500/20"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center ${
                          isActive ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-xs leading-tight pr-4">
                          {section.label}
                        </span>
                      </div>
                      <FaChevronRight size={10} className={isActive ? "text-emerald-600" : "text-slate-400"} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ScrollSpyNav;
