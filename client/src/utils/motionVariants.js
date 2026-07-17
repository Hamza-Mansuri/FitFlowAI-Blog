// Reusable Framer Motion Variants for FitFlowAI Redesign

export const sectionReveal = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const hoverLift = {
  rest: { y: 0, scale: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.08)",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const imageReveal = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: customDelay,
      ease: "easeOut",
    },
  }),
};
