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
      filter: "blur(12px)", 
      opacity: 0,
      y: 10
    },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="pb-12">
      <Container>

        <div className="mt-4 mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Explore Topics
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-450">
            Filter articles by fitness goals and wellness topics.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <motion.button
              variants={itemVariants}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-md shadow-green-500/20"
                    : "border border-green-200 bg-white text-slate-700 hover:border-green-600 hover:bg-green-50 hover:text-green-700 hover:shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
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