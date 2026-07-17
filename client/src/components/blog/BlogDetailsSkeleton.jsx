function BlogDetailsSkeleton() {
    return (
        <section className="py-10">
            <div className="mx-auto max-w-5xl animate-pulse px-4">

                {/* Hero */}
                <div className="h-[420px] rounded-3xl bg-slate-200 dark:bg-slate-800"></div>

                {/* Category */}
                <div className="mt-8 h-6 w-28 rounded-full bg-slate-200 dark:bg-slate-800"></div>

                {/* Title */}
                <div className="mt-6 h-10 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>

                <div className="mt-3 h-10 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>

                {/* Meta */}
                <div className="mt-8 flex gap-5">
                    <div className="h-5 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>

                    <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>

                    <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>

                {/* Paragraphs */}
                <div className="mt-10 space-y-4">
                    <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-5 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>

                    <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>

            </div>
        </section>
    );
}

export default BlogDetailsSkeleton;