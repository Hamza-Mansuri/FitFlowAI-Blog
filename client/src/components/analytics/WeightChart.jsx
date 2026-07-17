import Chart from "react-apexcharts";
import { useState } from "react";

function WeightChart({ data = [] }) {
  const [filter, setFilter] = useState("30");

  const getFilteredData = () => {
    const limit = Number(filter);
    if (!data || data.length === 0) return [];
    return data.slice(-limit);
  };

  const filtered = getFilteredData();
  const dates = filtered.map(w => w.date);
  const weights = filtered.map(w => w.weight);

  const series = [
    {
      name: "Weight (kg)",
      data: weights,
    },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#10b981"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dates,
      labels: {
        style: { colors: "#64748b", fontSize: "10px", fontWeight: "600" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: "10px", fontWeight: "600" },
      },
    },
    grid: {
      borderColor: "rgba(100, 116, 139, 0.08)",
      strokeDashArray: 4,
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-xl space-y-6">
      
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Weight Progression Trend
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
            Interactive area chart showing weight progression history.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit text-[10px] font-bold text-slate-550">
          {[
            { id: "7", name: "7 Days" },
            { id: "30", name: "30 Days" },
            { id: "90", name: "90 Days" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === tab.id
                  ? "bg-white dark:bg-slate-950 text-emerald-500 shadow-sm"
                  : "hover:text-slate-750"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Apex Chart */}
      {weights.length === 0 ? (
        <div className="py-20 text-center text-xs text-slate-450">
          Log daily weight entries in Check-in to build trend analytics.
        </div>
      ) : (
        <div className="w-full">
          <Chart options={options} series={series} type="area" height={260} />
        </div>
      )}

    </div>
  );
}

export default WeightChart;
