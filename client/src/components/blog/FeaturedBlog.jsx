import {
  FaArrowRight,
  FaDumbbell,
  FaAppleAlt,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import gautam from "../../assets/images/gautam.png";

function FeaturedBlog() {
  return (
    <section className="py-6">
      <Container>
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, x: -100 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ 
            type: "spring",
            stiffness: 90,
            damping: 14,
            bounce: 0.4,
            duration: 0.9
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#06302c] via-[#0B5A53] to-[#128177] shadow-xl"
        >
          {/* Animated Background Orbs */}
          <div className="absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-green-400/10 blur-[80px]" />
          <div className="absolute left-[30%] bottom-[-20%] h-80 w-80 rounded-full bg-emerald-400/10 blur-[100px]" />

          {/* Background Decorative Shapes */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute left-[55%] top-10 h-24 w-24 border border-white rounded-xl"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute right-[25%] bottom-10 h-32 w-32 border border-white rounded-3xl"
            />
          </div>

          <div className="relative grid items-center lg:grid-cols-[1.1fr_0.9fr] gap-6">

            {/* LEFT */}
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:py-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center rounded-full bg-green-400/15 border border-green-400/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-300"
              >
                🔥 Featured Fitness Guide
              </motion.span>

              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
              >
                Build a Stronger,
                <br />
                Healthier You.
              </motion.h2>

              <div className="mt-4 h-1.5 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"></div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-slate-150"
              >
                Learn practical, science-backed strategies for training,
                nutrition, fat loss, recovery, and sustainable lifestyle
                transformation.
              </motion.p>

              {/* Topics */}
              <div className="mt-8 flex flex-wrap gap-5 text-xs sm:text-sm font-semibold text-slate-100">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaDumbbell className="text-green-400" />
                  <span>Strength Training</span>
                </div>

                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaAppleAlt className="text-green-400" />
                  <span>Nutrition Science</span>
                </div>

                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaHeart className="text-green-400" />
                  <span>Healthy Lifestyle</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button 
                whileHover={{ scale: 1.03, x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition shadow-md shadow-green-500/10 hover:shadow-lg"
              >
                Start Learning
                <FaArrowRight className="text-xs" />
              </motion.button>
            </div>

            {/* RIGHT */}
            <div className="flex items-end justify-center self-end overflow-hidden lg:h-full relative">
              <motion.img
                initial={{ opacity: 0, y: 80, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 14,
                  bounce: 0.4,
                  delay: 0.15 
                }}
                src={gautam}
                alt="Gautam Jani"
                className="h-[280px] object-contain md:h-[320px] lg:h-[380px] drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedBlog;