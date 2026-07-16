import { motion } from "framer-motion";

function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light Mode Blobs */}
      <div className="absolute block dark:hidden top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-200/45 blur-[120px] animate-blob-slow" />
      <div className="absolute block dark:hidden bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-150/40 blur-[130px] animate-blob-medium" />
      <div className="absolute block dark:hidden top-[40%] right-[10%] w-[35%] h-[35%] rounded-full bg-teal-100/35 blur-[110px] animate-blob-slow" />

      {/* Dark Mode Blobs */}
      <div className="absolute hidden dark:block top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-green-950/15 blur-[140px] animate-blob-slow" />
      <div className="absolute hidden dark:block bottom-[-15%] right-[-15%] w-[70%] h-[70%] rounded-full bg-emerald-950/12 blur-[150px] animate-blob-medium" />
      <div className="absolute hidden dark:block top-[35%] right-[5%] w-[45%] h-[45%] rounded-full bg-teal-950/10 blur-[130px] animate-blob-slow" />
    </div>
  );
}

export default GlowBackground;
