import { motion } from "framer-motion";
import Container from "../layout/Container";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
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

  // Double list to create a seamless loop
  const listDouble = [...testimonials, ...testimonials];

  return (
    <section className="py-8 md:py-12 relative overflow-hidden">
      {/* Background glow and light particles */}
      <div className="absolute left-[30%] top-[40%] w-[35vw] h-[35vw] rounded-full bg-emerald-550/5 blur-[130px] pointer-events-none z-0" />
      
      <Container>
        <div className="text-center mb-14 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Trusted by Fitness Enthusiasts Worldwide
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-slate-500 dark:text-slate-400 text-base md:text-lg font-light max-w-2xl mx-auto px-4"
          >
            Thousands of readers improve their health every day with FitFlowAI's evidence-based fitness education.
          </motion.p>
        </div>
      </Container>

      {/* Infinite Horizontal Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full flex overflow-hidden relative z-10 py-4 select-none mask-gradient"
      >
        <div className="flex gap-6 animate-carousel-scroll hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
          {listDouble.map((item, idx) => (
            <TestimonialCard key={idx} item={item} />
          ))}
        </div>
      </motion.div>

      {/* Custom Styles for Carousel Animation */}
      <style>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        @keyframes carousel-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }
        .animate-carousel-scroll {
          animation: carousel-scroll 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
