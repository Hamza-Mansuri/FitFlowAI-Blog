import Chart from "react-apexcharts";

function MacroChart({ protein = 150, carbs = 220, fat = 65 }) {
  const series = [protein, carbs, fat];

  const options = {
    chart: { type: "donut", background: "transparent" },
    colors: ["#10b981", "#3b82f6", "#f43f5e"],
    labels: ["Protein (g)", "Carbs (g)", "Fat (g)"],
    theme: { mode: "dark" },
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-205 bg-white/40 dark:border-slate-800/40 dark:bg-slate-955/40 p-6 shadow-xl">
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Macro Distribution Split</h3>
      <Chart options={options} series={series} type="donut" height={180} />
    </div>
  );
}

export default MacroChart;
