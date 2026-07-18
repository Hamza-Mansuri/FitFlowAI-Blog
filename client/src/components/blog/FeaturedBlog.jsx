import { motion } from "framer-motion";
import Container from "../layout/Container";
import FeaturedImage from "./FeaturedImage";
import FeaturedMetadata from "./FeaturedMetadata";
import FeaturedButtons from "./FeaturedButtons";

function FeaturedBlog({ blogs = [] }) {
  // Look for any blog written by Gautam Jani
  const gautamBlog = blogs.find(
    (b) =>
      b.author?.toLowerCase().includes("gautam") ||
      b.title?.toLowerCase().includes("stronger") ||
      b.title?.toLowerCase().includes("healthier")
  );

  const blogId = gautamBlog ? gautamBlog._id : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-transparent">
      {/* Background decoration orbs */}
      <div className="absolute right-[8%] top-[10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/[0.04] dark:bg-emerald-500/[0.08] blur-[150px] pointer-events-none z-0" />
      <div className="absolute left-[5%] bottom-[10%] w-[38vw] h-[38vw] rounded-full bg-green-500/[0.03] dark:bg-green-600/[0.05] blur-[120px] pointer-events-none z-0" />

      <Container className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full z-10 relative"
        >
          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 50px -10px rgba(16, 185, 129, 0.04)"
            }}
            className="relative overflow-hidden rounded-[2.5rem] bg-white/80 dark:bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-950/85 dark:to-slate-900/90 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-2xl p-8 sm:p-12 lg:p-16 transition-all duration-500"
          >
            {/* Subtle grid lines in background */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-10 lg:gap-14 items-center">
              {/* Photo on Left */}
              <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[420px] lg:max-w-none">
                  <FeaturedImage />
                </div>
              </div>

              {/* Content details on Right */}
              <div className="flex flex-col text-left space-y-6 w-full">
                <div>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-450/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
                    ✨ FEATURED FITNESS GUIDE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2] max-w-xl">
                  Build a Stronger,
                  <br />
                  Healthier You.
                </h2>

                <p className="text-sm md:text-base text-slate-600 dark:text-slate-350 font-light leading-relaxed max-w-2xl">
                  Learn practical, science-backed strategies for training,
                  nutrition, fat loss, recovery, and sustainable lifestyle
                  transformation. Discover the roadmap to achieving peak performance.
                </p>

                <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800/80" />

                <div className="w-full">
                  <FeaturedMetadata />
                </div>

                <div className="w-full pt-2">
                  <FeaturedButtons blogId={blogId} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedBlog;