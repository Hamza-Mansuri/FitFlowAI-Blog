import { motion } from "framer-motion";

function GlowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Glow Element 1 */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px]"
      />

      {/* Glow Element 2 */}
      <motion.div
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-green-500/10 dark:bg-green-600/5 blur-[150px]"
      />

      {/* Glow Element 3 */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-teal-500/8 dark:bg-teal-500/4 blur-[130px]"
      />
    </div>
  );
}

export default GlowLayer;
