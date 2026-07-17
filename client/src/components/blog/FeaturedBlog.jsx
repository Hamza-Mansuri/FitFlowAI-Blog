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

  // Stagger variants for entry
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-6 md:py-10 relative overflow-hidden">
      {/* Background decoration orbs */}
      <div className="absolute right-[5%] top-[10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute left-[-5%] bottom-[-10%] w-[35vw] h-[35vw] rounded-full bg-green-500/3 blur-[120px] pointer-events-none z-0" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(16, 185, 129, 0.08)"
          }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900/95 via-slate-950/85 to-slate-900/90 backdrop-blur-2xl border border-white/10 hover:border-emerald-500/20 shadow-2xl p-6 sm:p-10 lg:p-14 transition-all duration-500 z-10"
        >
          {/* Two column Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            
            {/* LEFT: Image */}
            <motion.div variants={itemVariants} className="w-full h-full">
              <FeaturedImage />
            </motion.div>

            {/* RIGHT: Content */}
            <div className="flex flex-col justify-center items-start text-left space-y-6 lg:space-y-7">
              
              {/* Category Badge */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/25 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md">
                  ✨ FEATURED fitness GUIDE
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] max-w-xl"
              >
                Build a Stronger,
                <br />
                Healthier You.
              </motion.h2>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-base text-slate-400 font-light leading-relaxed max-w-xl"
              >
                Learn practical, science-backed strategies for training,
                nutrition, fat loss, recovery, and sustainable lifestyle
                transformation. Discover the roadmap to achieving peak performance.
              </motion.p>

              {/* Divider */}
              <motion.div 
                variants={itemVariants}
                className="w-full h-[1px] bg-slate-800" 
              />

              {/* Author & Meta details */}
              <motion.div variants={itemVariants} className="w-full">
                <FeaturedMetadata />
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="w-full pt-2">
                <FeaturedButtons blogId={blogId} />
              </motion.div>

            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedBlog;