import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import API from "../../services/api";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".final-cta-card", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".final-cta-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/newsletter/subscribe", { email });
      toast.success(data.message || "Thank you for subscribing!");
      setSubscribed(true);
      setEmail("");
      
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Subscription failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={containerRef} className="py-10 md:py-14 relative overflow-hidden bg-transparent">
      {/* Background soft glowing circles */}
      <div className="absolute right-[8%] top-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/8 blur-[130px] pointer-events-none" />
      <div className="absolute left-[3%] bottom-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/6 blur-[120px] pointer-events-none" />

      <Container className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="final-cta-card relative overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-emerald-50/80 via-white to-slate-50/80 border border-emerald-500/15 shadow-[0_20px_50px_rgba(16,185,129,0.08)] p-8 sm:p-12 lg:p-16 z-10">
          
          {/* Linear-style top gradient accent border */}
          <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

          {/* Subtle grid lines in background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-14 items-center relative z-10">
            {/* LEFT SIDE: Call to Action */}
            <div className="flex flex-col text-left space-y-5">
              <div>
                <span className="inline-flex items-center rounded-full bg-emerald-600/10 border border-emerald-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 backdrop-blur-md">
                  🚀 Your Fitness Journey Starts Here
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
                Start Building Your
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Strongest Self Today.
                </span>
              </h2>

              <p className="max-w-lg text-sm text-slate-600 font-light leading-relaxed">
                Unlock evidence-based fitness resources, customize nutrition schedules, and build healthy fitness habits that last forever.
              </p>

              <div className="pt-3">
                <Link to="/categories">
                  <motion.button
                    whileHover={{ scale: 1.025, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3.5 text-sm font-extrabold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
                  >
                    <span>Explore Articles</span>
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Newsletter Subscription form */}
            <div className="flex flex-col text-left p-6 sm:p-8 rounded-[2rem] bg-white/90 border border-slate-200/60 shadow-xl backdrop-blur-md space-y-4">
              <div>
                <span className="inline-block rounded-full bg-emerald-600/10 border border-emerald-500/20 px-3 py-0.5 text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
                  ✨ Weekly Fitness Newsletter
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Stay Consistent. Stay Informed.
              </h3>

              <p className="text-xs leading-relaxed text-slate-550 font-light">
                Join 12,000+ readers. Get weekly fitness tips, nutrition advice, and evidence-based training guides.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-3.5 w-full pt-1">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || subscribed}
                    placeholder="Enter your email address"
                    required
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FaCheck className="text-xs" />
                        <span>Subscribed!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FaPaperPlane size={9} />
                        <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-semibold text-center mt-1">
                🔒 No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCTA;
