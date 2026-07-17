import Chart from "react-apexcharts";

function RecoveryChart({ data = [] }) {
  const dates = data.slice(-15).map(r => r.date);
  const recoveryScores = data.slice(-15).map(r => r.recoveryScore);
  const sleepHours = data.slice(-15).map(r => r.sleep * 10); // scale sleep to match 0-100 score bounds

  const series = [
    { name: "Recovery Index (%)", data: recoveryScores },
    { name: "Sleep Index (scaled %)", data: sleepHours },
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#10b981", "#3b82f6"],
    stroke: {
      curve: "smooth",
      width: [3, 2],
      dashArray: [0, 4],
    },
    dataLabels: { enabled: false },
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
    theme: { mode: "dark" },
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-xl space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          Recovery vs Sleep Indices
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
          Reviews daily recovery trends and sleep quality logs.
        </p>
      </div>

      {recoveryScores.length === 0 ? (
        <div className="py-20 text-center text-xs text-slate-450">
          Complete daily check-in logs to track recovery index metrics.
        </div>
      ) : (
        <div className="w-full">
          <Chart options={options} series={series} type="line" height={260} />
        </div>
      )}
    </div>
  );
}

export default RecoveryChart;
