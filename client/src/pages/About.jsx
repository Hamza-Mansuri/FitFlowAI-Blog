import { motion } from "framer-motion";
import { FaGraduationCap, FaAward } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import gautamImg from "../assets/images/gautam.png";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <PageTransition>
      <SEO
        title="About Gautam Jani | FitFlowAI Founder"
        description="Learn more about Gautam Jani, his science-backed training philosophies, credentials, and the FitFlowAI fitness community."
      />

      <div className="relative bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] min-h-screen text-slate-800 dark:text-slate-100 overflow-hidden">
        {/* Animated background glows */}
        <GlowBackground />

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-20 pb-16 text-center relative overflow-hidden">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-3xl"
              >
                <span className="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 mb-5">
                  MEET THE FOUNDER & COACH
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-650 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Behind the Science.
                </h1>
                <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-slate-350 max-w-xl mx-auto font-medium">
                  FitFlowAI was built to bridge the gap between complex peer-reviewed science and your daily healthy fitness routines.
                </p>
              </motion.div>
            </Container>
          </section>

          {/* Coach Profile Card Grid */}
          <section className="py-16">
            <Container>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="lg:col-span-5 flex justify-center"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-400 opacity-20 blur-xl transition group-hover:opacity-30"></div>
                    <img
                      src={gautamImg}
                      alt="Gautam Jani - Coach"
                      className="relative w-80 sm:w-96 lg:w-full max-w-md rounded-3xl object-cover shadow-2xl border border-slate-200/60 dark:border-slate-800/40 bg-slate-100 dark:bg-slate-950"
                    />
                  </div>
                </motion.div>

                {/* Bio Details */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="lg:col-span-7 space-y-6"
                >
                  <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    Gautam Jani
                  </h2>
                  <p className="text-sm font-extrabold uppercase tracking-wider text-green-600 dark:text-green-400">
                    Sports Nutritionist & Strength Specialist
                  </p>

                  <p className="text-slate-650 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-medium">
                    Gautam Jani is an expert strength coach, active sports nutritionist, and wellness researcher. With years of experience consulting corporate professionals, athletes, and fitness enthusiasts, he has designed dynamic, science-based protocols that yield results without taking over your entire schedule.
                  </p>

                  {/* Milestones / Credentials */}
                  <div className="grid gap-5 sm:grid-cols-2 mt-8">
                    <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/70 border border-slate-200/60 shadow-sm dark:bg-slate-955/65 dark:border-slate-800/40 backdrop-blur-sm">
                      <FaGraduationCap className="text-2xl text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-950 dark:text-white text-sm">Certified Sports Nutritionist</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Specialized in macronutrient splits and performance diets.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-5 rounded-3xl bg-white/70 border border-slate-200/60 shadow-sm dark:bg-slate-955/65 dark:border-slate-800/40 backdrop-blur-sm">
                      <FaAward className="text-2xl text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-950 dark:text-white text-sm">Active Strength Specialist</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Certified trainer guiding over 500+ success stories.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Container>
          </section>

          {/* Pillars / Values Grid */}
          <section className="py-16">
            <Container>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Our Foundation Pillars</h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium">Every piece of advice we publish adheres to these core guidelines.</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[
                  { title: "Evidence-Based", desc: "No trends, no crash diets. Every recommendation is backed by modern clinical research and sports science research." },
                  { title: "Sustainable Living", desc: "We build programs that fit your work and family lifestyle. Extreme restrictions lead to rebound; balance leads to results." },
                  { title: "Mindset Architecture", desc: "Fitness is a psychological game first. We provide habit loop structures to build discipline over fleeting motivation." },
                ].map((pillar, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 dark:border-slate-800/40 dark:bg-slate-955/65 shadow-sm backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-500/10 to-emerald-500/25 text-green-600 dark:text-green-400 mb-6 font-extrabold shadow-inner border border-green-500/10">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-slate-950 dark:text-white">{pillar.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{pillar.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </Container>
          </section>

          {/* Contact CTA Section */}
          <section className="py-20 text-center relative overflow-hidden">
            <Container>
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Start Your Transformation Today</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Reach out to Gautam directly for custom coaching queries, or explore our curated categories.</p>
                <div className="flex gap-4 justify-center flex-wrap pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/contact" className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 font-bold hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/10 transition">
                      Contact Gautam
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/categories" className="rounded-full border border-slate-300/80 dark:border-slate-800 bg-white/70 dark:bg-slate-955/65 px-8 py-3.5 font-bold hover:bg-slate-50 transition backdrop-blur-sm">
                      Explore Topics
                    </Link>
                  </motion.div>
                </div>
              </div>
            </Container>
          </section>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default About;