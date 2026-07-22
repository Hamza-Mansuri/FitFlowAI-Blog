/**
 * Shared animation configurations and motion variants for FitFlowAI.
 * Inspired by design systems of Apple, Stripe, and Linear.
 */
export const transitions = {
  // Premium ultra-smooth elastic spring
  springWarm: {
    type: "spring",
    stiffness: 70,
    damping: 18,
    mass: 1,
  },
  // Snappy interactive spring
  springResponsive: {
    type: "spring",
    stiffness: 150,
    damping: 15,
  },
  // Smooth magnetic spring
  magnetic: {
    type: "spring",
    stiffness: 80,
    damping: 12,
    mass: 0.6,
  },
  // Custom ease-out curve (cubic-bezier) for clean premium feel
  easeOutPremium: {
    type: "tween",
    ease: [0.16, 1, 0.3, 1], // easeOutExpo / custom
    duration: 1.2,
  },
};

export const variants = {
  // Stagger wrapper for parent container
  staggerContainer: (staggerChildren = 0.15, delayChildren = 0) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),

  // Fade and slide up for text elements
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.easeOutPremium,
    },
  },

  // Direct fade
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...transitions.easeOutPremium,
        duration: 1.5,
      },
    },
  },
};

export default { transitions, variants };
