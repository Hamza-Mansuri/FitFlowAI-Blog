import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRunning, FaDumbbell, FaAppleAlt, FaSpa, FaHeart, FaChevronRight } from "react-icons/fa";
import SEO from "../components/common/SEO";

function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const categories = [
    { name: "Workout", icon: <FaDumbbell className="text-3xl text-green-500" />, desc: "High-intensity training, strength routines, and exercise optimization." },
    { name: "Nutrition", icon: <FaAppleAlt className="text-3xl text-emerald-500" />, desc: "Evidence-based diet guides, protein timing, and healthy recipes." },
    { name: "Recovery", icon: <FaSpa className="text-3xl text-teal-500" />, desc: "Active rest days, dynamic stretching, and sleep improvement hacks." },
    { name: "Health", icon: <FaHeart className="text-3xl text-red-500" />, desc: "Hydration science, biometric insights, and longevity wellness." },
    { name: "Lifestyle", icon: <FaRunning className="text-3xl text-blue-500" />, desc: "Consistency mindset, fitness habit loops, and daily structure." },
  ];

  return (
    <>
      <SEO 
        title="FitFlowAI | Evidence-Based Fitness Hub"
        description="Unlock your physical potential with evidence-based guides, dynamic workouts, and personalized fitness tools."
      />

      <div className="min-h-screen bg-slate-900 text-white selection:bg-green-500 selection:text-slate-900 overflow-x-hidden">
        
        {/* Floating background lights */}
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Dedicated Landing Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 text-slate-950 font-extrabold shadow shadow-green-500/30">
                F
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">
                FitFlow<span className="text-green-500">AI</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition duration-200">
                Sign In
              </Link>
              <Link to="/signup" className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20">
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-xs font-semibold text-green-400 backdrop-blur mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              YOUR ULTIMATE WELLNESS COMPANION
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-black tracking-tight sm:text-7xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            >
              Build a Stronger, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Healthier Version</span> of You.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-slate-400"
            >
              Join a community of fitness enthusiasts reading evidence-based articles, science-backed workout strategies, nutrition advice, and longevity routines.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-slate-950 transition hover:bg-green-400 hover:scale-102 shadow-lg shadow-green-500/10"
              >
                Join Now Free
                <FaChevronRight className="text-xs" />
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-slate-700 bg-slate-800/40 px-8 py-4 text-base font-bold text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/80 transition duration-200"
              >
                Sign In to Platform
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-slate-800 bg-slate-950/40 py-12 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-extrabold text-white">12K+</h3>
                <p className="mt-1 text-sm text-slate-500">Active Readers</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-green-500">60+</h3>
                <p className="mt-1 text-sm text-slate-500">Expert Articles</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-white">5</h3>
                <p className="mt-1 text-sm text-slate-500">Wellness Categories</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-green-500">99.8%</h3>
                <p className="mt-1 text-sm text-slate-500">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Categories Grid */}
        <section className="py-24 px-6 relative">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Expert-Curated Categories</h2>
              <p className="mt-3 text-slate-400">Everything you need to optimize your daily health routine.</p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-slate-800 bg-slate-950 p-8 hover:border-slate-700 transition-all duration-300 shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 mb-6 border border-slate-800">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{cat.name}</h3>
                  <p className="text-sm leading-6 text-slate-400">{cat.desc}</p>
                </motion.div>
              ))}

              {/* Callout Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-3xl border border-slate-800 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-3">And Much More...</h3>
                  <p className="text-sm leading-6 text-slate-400">
                    Get custom recipes, supplements guidance, hydration benchmarks, and mental fitness guidelines to keep you performing at peak capacity.
                  </p>
                </div>
                <Link to="/signup" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-green-400 hover:text-green-300">
                  Join to explore
                  <FaChevronRight className="text-xs" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Bottom Section */}
        <section className="bg-slate-950 py-20 px-6 border-t border-slate-800 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-slate-400">
              Create a free account in 30 seconds and gain instant access to all fitness and nutrition articles.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/signup" className="rounded-full bg-green-500 px-8 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-green-400 hover:scale-102">
                Register Free
              </Link>
              <Link to="/login" className="rounded-full border border-slate-800 bg-slate-900 px-8 py-3.5 text-sm font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Landing Footer */}
        <footer className="border-t border-slate-800/50 py-8 text-center text-xs text-slate-600 bg-slate-950">
          <p>© 2026 FitFlowAI. All rights reserved. Designed for portfolios.</p>
        </footer>

      </div>
    </>
  );
}

export default Landing;
