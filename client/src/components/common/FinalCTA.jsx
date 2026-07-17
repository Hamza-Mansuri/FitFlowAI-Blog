import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import Container from "../layout/Container";

function FinalCTA() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background soft glowing circles */}
      <div className="absolute right-[10%] top-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[-10%] w-[40vw] h-[40vw] rounded-full bg-green-500/10 dark:bg-green-600/5 blur-[120px] pointer-events-none" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-[#052320] via-[#083a35] to-[#0b544d] border border-emerald-500/10 shadow-2xl p-8 sm:p-14 lg:p-20 text-center"
        >
          {/* Subtle grid lines in background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-450/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md"
            >
              🚀 Your Fitness Journey Starts Here
            </motion.span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Start Building Your
              <br />
              Strongest Self Today.
            </h2>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-350 font-light leading-relaxed">
              Unlock evidence-based fitness resources, customize nutrition schedules, and build healthy fitness habits that last forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full sm:w-auto">
              <Link to="/categories" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-sm font-extrabold text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20 cursor-pointer"
                >
                  <span>Explore Articles</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <button
                onClick={() => {
                  document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold text-slate-200 transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20 cursor-pointer"
              >
                <FaEnvelope className="text-xs text-emerald-400 animate-pulse" />
                <span>Join Newsletter</span>
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FinalCTA;
