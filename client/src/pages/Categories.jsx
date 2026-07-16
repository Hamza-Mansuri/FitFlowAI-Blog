import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRunning, FaDumbbell, FaAppleAlt, FaSpa, FaHeart, FaChevronRight } from "react-icons/fa";
import Container from "../components/layout/Container";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";

function Categories() {
  const categoriesList = [
    {
      name: "Workout",
      icon: <FaDumbbell className="text-3xl text-green-500" />,
      desc: "Maximize gains, perfect lift form, and optimize your strength schedule.",
      tagline: "15 Articles Available",
      path: "/?category=Workout",
      color: "hover:border-green-500/50"
    },
    {
      name: "Nutrition",
      icon: <FaAppleAlt className="text-3xl text-emerald-500" />,
      desc: "Evidence-based metabolic fueling, protein scheduling, and clean meal design.",
      tagline: "10 Articles Available",
      path: "/?category=Nutrition",
      color: "hover:border-emerald-500/50"
    },
    {
      name: "Recovery",
      icon: <FaSpa className="text-3xl text-teal-500" />,
      desc: "Relieve muscle soreness, manage inflammation, and optimize sleep cycles.",
      tagline: "8 Articles Available",
      path: "/?category=Recovery",
      color: "hover:border-teal-500/50"
    },
    {
      name: "Health",
      icon: <FaHeart className="text-3xl text-red-500" />,
      desc: "Clinical health insights, hydration benchmarks, and physiological stats.",
      tagline: "4 Articles Available",
      path: "/?category=Health",
      color: "hover:border-red-500/50"
    },
    {
      name: "Lifestyle",
      icon: <FaRunning className="text-3xl text-blue-500" />,
      desc: "Habit formation loops, morning architectures, and self-discipline strategies.",
      tagline: "8 Articles Available",
      path: "/?category=Lifestyle",
      color: "hover:border-blue-500/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <PageTransition>
      <SEO
        title="Fitness & Wellness Categories | FitFlowAI"
        description="Browse fitflowAI categories to filter expert guides on strength training, food sciences, sleep, and longevity."
      />

      <div className="relative bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] min-h-screen text-slate-800 dark:text-slate-100 overflow-hidden pb-1">
        {/* Animated background glows */}
        <GlowBackground />

        <div className="relative z-10">
          {/* Header Hero */}
          <section className="pt-20 pb-16 text-center relative overflow-hidden">
            <Container>
              <div className="mx-auto max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 mb-5">
                  EXPLORE TOPICS
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-650 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Wellness Categories
                </h1>
                <p className="mt-4 text-slate-550 dark:text-slate-350 font-medium">
                  Choose a category below to filter expert research articles and target your exact fitness objective.
                </p>
              </div>
            </Container>
          </section>

          {/* Categories Explorer Cards Grid */}
          <section className="py-12">
            <Container>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
              >
                {categoriesList.map((cat, index) => (
                  <Link key={index} to={cat.path} className="h-full">
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`h-full rounded-3xl border border-slate-200 bg-white/70 p-8 transition-all duration-300 dark:border-slate-800/40 dark:bg-slate-955/65 backdrop-blur-sm shadow-sm hover:shadow-lg flex flex-col justify-between ${cat.color}`}
                    >
                      <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/40 dark:bg-slate-900 dark:border-slate-800/40 mb-6">
                          {cat.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">{cat.name}</h3>
                        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium mb-6">{cat.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-4 mt-2">
                        <span className="text-xs font-semibold text-slate-400">{cat.tagline}</span>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-700 transition-colors">
                          Filter Blogs
                          <FaChevronRight className="text-[9px]" />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* General Newsletter Callout Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-3xl border border-slate-200 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent p-8 flex flex-col justify-between shadow-sm dark:border-slate-800/50 backdrop-blur-sm"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">Newsletter</h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                      Get weekly summaries of Gautam Jani's latest research uploads sent straight to your inbox.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Join 12,000+ Readers</span>
                    <a href="#newsletter" className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-700 transition-colors">
                      Subscribe
                      <FaChevronRight className="text-[9px]" />
                    </a>
                  </div>
                </motion.div>

              </motion.div>
            </Container>
          </section>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default Categories;