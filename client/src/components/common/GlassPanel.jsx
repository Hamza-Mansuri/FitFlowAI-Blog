function GlassPanel({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-slate-200/50 bg-white/40 backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/40 shadow-xl transition-all duration-300 ${className}`}>
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/3 via-transparent to-green-500/2 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GlassPanel;
