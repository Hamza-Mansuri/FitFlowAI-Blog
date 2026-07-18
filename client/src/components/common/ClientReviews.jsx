import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Container from "../layout/Container";

function ClientReviews() {
  const testimonials = [
    {
      name: "Marcus Vance",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      text: "The science-backed nutrition articles changed how I fuel my runs. Down 15lbs and feeling faster than ever.",
      tag: "Nutrition",
    },
    {
      name: "Sophia Chen",
      country: "Canada",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "FitFlowAI's strength training guides helped me fix my squat form. I'm finally lifting pain-free!",
      tag: "Strength",
    },
    {
      name: "Lukas Weber",
      country: "Germany",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "The recovery guides are gold. Incorporating active rest has dramatically cut my soreness between workouts.",
      tag: "Recovery",
    },
    {
      name: "Aria Thorne",
      country: "Australia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      text: "The sleep and lifestyle deep-dives finally helped me build a consistent, healthy morning routine.",
      tag: "Lifestyle",
    },
    {
      name: "Mateo Gomez",
      country: "Spain",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop",
      text: "I love the detailed breakdown of fat loss. No gimmicks, just raw evidence-based education.",
      tag: "Fat Loss",
    },
  ];

  // Tripled list for a seamless marquee loop
  const listDouble = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50/20 dark:bg-transparent transition-colors duration-500">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-600 dark:text-emerald-450"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Trusted by Fitness Enthusiasts Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-light leading-relaxed"
          >
            Thousands of readers improve their health every day with FitFlowAI's evidence-based fitness education.
          </motion.p>
        </div>
      </Container>

      {/* Horizontal Continuous Marquee Loop Wrapper with Left/Right Blur Masks */}
      <div className="w-full relative overflow-hidden mask-gradient-horizontal py-4">
        <div className="flex gap-6 animate-marquee-horizontal hover:[animation-play-state:paused] w-max px-6">
          {listDouble.map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[350px] p-6 rounded-[2rem] border border-slate-200/60 dark:border-white/5 bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-xl flex flex-col gap-4 text-left transition-all duration-300 hover:border-emerald-500/25 dark:hover:border-emerald-500/25"
            >
              {/* User Row */}
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold mt-0.5">
                    {item.country}
                  </span>
                </div>

                <span className="ml-auto text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.tag}
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" size={11} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-400 font-light italic">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styles for Horizontal Marquee Scroll and Edge Masks */}
      <style>{`
        .mask-gradient-horizontal {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333% - 8px));
          }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default ClientReviews;
