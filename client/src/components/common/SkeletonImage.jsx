import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SkeletonImage({ src, alt, className = "", aspectClass = "aspect-[16/10]" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full ${aspectClass} bg-slate-200 dark:bg-slate-900/60`}>
      {/* Shimmer loading skeleton */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-[length:200%_100%] animate-shimmer"
          />
        )}
      </AnimatePresence>

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 1.05,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${className} w-full h-full object-cover`}
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.6s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default SkeletonImage;
