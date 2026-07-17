import Container from "../layout/Container";
import { motion } from "framer-motion";

function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Workout",
    "Nutrition",
    "Recovery",
    "Health",
    "Lifestyle",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section className="py-4 relative overflow-hidden">
      <Container>
        <div className="mt-4 mb-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Explore Topics
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2.5 text-sm text-slate-500 dark:text-slate-450 max-w-md mx-auto"
          >
            Filter articles by fitness goals and wellness topics.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-3.5"
        >
          {categories.map((category) => (
            <motion.button
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                scale: 1.025,
                boxShadow: "0 10px 20px -5px rgba(16, 185, 129, 0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 backdrop-blur-md
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 border border-emerald-500/20"
                    : "border border-slate-200 bg-white/40 text-slate-650 hover:border-emerald-500 hover:text-emerald-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-350 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default CategoryList;