import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

export function ClientReviews() {
  const sectionRef = useRef(null);

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

  const listDouble = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".reviews-fade-el", { opacity: 1, y: 0 });
        return;
      }

      // Smooth heading slide/fade reveal
      gsap.fromTo(
        ".reviews-fade-el",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reviews-header",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative overflow-hidden bg-[#F8FAFC] transition-colors duration-500">
      <Container>
        {/* Header Section */}
        <div className="reviews-header text-center mb-12 max-w-2xl mx-auto space-y-4">
          <span className="reviews-fade-el inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-600">
            TESTIMONIALS
          </span>
          <h2 className="reviews-fade-el text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Trusted by Fitness Enthusiasts
          </h2>
          <p className="reviews-fade-el text-slate-600 text-sm md:text-base font-light leading-relaxed">
            Thousands of readers improve their health every day with FitFlowAI's evidence-based fitness education.
          </p>
        </div>
      </Container>

      {/* Horizontal Continuous Marquee Loop */}
      <div className="w-full relative overflow-hidden mask-gradient-horizontal py-4">
        <div className="flex gap-6 animate-marquee-horizontal hover:[animation-play-state:paused] w-max px-6">
          {listDouble.map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[350px] p-6 rounded-[2rem] border border-slate-200 bg-white shadow-sm flex flex-col gap-4 text-left transition-all duration-300 hover:border-emerald-500/25 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {item.country}
                  </span>
                </div>

                <span className="ml-auto text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {item.tag}
                </span>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" size={11} />
                ))}
              </div>

              <p className="text-xs leading-relaxed text-slate-600 font-light italic">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

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
          animation: marquee-horizontal 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default ClientReviews;
