function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      {/* Shimmering Image Area */}
      <div className="relative h-52 w-full animate-pulse bg-slate-200 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }}></div>
      </div>

      {/* Shimmering Content Area */}
      <div className="space-y-4 p-4 animate-pulse">
        {/* Category Badge */}
        <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800"></div>

        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Description Lines */}
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3 w-11/12 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-slate-900">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
