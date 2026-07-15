import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRunning, FaDumbbell, FaAppleAlt, FaSpa, FaHeart, FaChevronRight } from "react-icons/fa";
import Container from "../components/layout/Container";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";

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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEO
        title="Fitness & Wellness Categories | FitFlowAI"
        description="Browse fitflowAI categories to filter expert guides on strength training, food sciences, sleep, and longevity."
      />

      <div className="bg-slate-50 transition-colors duration-300 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 pb-1">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-green-50 to-slate-50 py-16 dark:from-slate-950 dark:to-slate-900 text-center">
          <Container>
            <div className="mx-auto max-w-2xl">
              <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400 mb-4">
                EXPLORE TOPICS
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Wellness Categories
              </h1>
              <p className="mt-4 text-slate-500 dark:text-slate-350">
                Choose a category below to filter expert research articles and target your exact fitness objective.
              </p>
            </div>
          </Container>
        </section>

        {/* Categories Explorer Cards Grid */}
        <section className="py-16">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            >
              {categoriesList.map((cat, index) => (
                <Link key={index} to={cat.path}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    className={`h-full rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 dark:border-slate-850 dark:bg-slate-950 shadow-sm hover:shadow-lg flex flex-col justify-between ${cat.color}`}
                  >
                    <div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 mb-6 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                        {cat.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">{cat.name}</h3>
                      <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 mb-6">{cat.desc}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-900 pt-4 mt-2">
                      <span className="text-xs font-semibold text-slate-400">{cat.tagline}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-700">
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
                className="rounded-3xl border border-slate-200 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent p-8 flex flex-col justify-between shadow-sm dark:border-slate-850"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">Newsletter</h3>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Get weekly summaries of Gautam Jani's latest research uploads sent straight to your inbox.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Join 12,000+ Readers</span>
                  <a href="#newsletter" className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-700">
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
    </>
  );
}

export default Categories;