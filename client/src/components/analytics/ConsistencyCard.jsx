import Chart from "react-apexcharts";

function ConsistencyCard({ score = 0, workoutPct = 0, dietPct = 0 }) {
  const series = [score, workoutPct, dietPct];

  const options = {
    chart: {
      type: "radialBar",
      background: "transparent",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "12px", color: "#64748b", fontWeight: "700" },
          value: { fontSize: "18px", color: "#ffffff", fontWeight: "900" },
          total: {
            show: true,
            label: "Consistency",
            formatter: () => `${score}%`,
          },
        },
        track: {
          background: "rgba(100, 116, 139, 0.08)",
        },
      },
    },
    colors: ["#10b981", "#3b82f6", "#f43f5e"],
    labels: ["Total Score", "Workout", "Nutrition"],
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-xl flex flex-col items-center text-center justify-between">
      
      <div className="w-full text-left">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          Adherence Score
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
          Based on workout sessions completed and nutritional plans followed.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <Chart options={options} series={series} type="radialBar" height={220} />
      </div>

      <div className="flex gap-4 text-[10px] font-bold mt-2">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Overall</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Workout</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Diet</span>
      </div>

    </div>
  );
}

export default ConsistencyCard;
