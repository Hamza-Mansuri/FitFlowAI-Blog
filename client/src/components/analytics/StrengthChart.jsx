import Chart from "react-apexcharts";

function StrengthChart({ data = [210, 245, 315] }) {
  const series = [{ name: "1RM (lbs)", data }];

  const options = {
    chart: { type: "bar", background: "transparent", toolbar: { show: false } },
    colors: ["#3b82f6"],
    xaxis: { categories: ["Bench Press", "Squat", "Deadlift"] },
    theme: { mode: "dark" },
  };

  return (
    <div className="rounded-[2.5rem] border border-slate-205 bg-white/40 dark:border-slate-800/40 dark:bg-slate-955/40 p-6 shadow-xl">
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Estimated Core Lift 1RMs</h3>
      <Chart options={options} series={series} type="bar" height={180} />
    </div>
  );
}

export default StrengthChart;
