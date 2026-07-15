import {
  FaBookOpen,
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
} from "react-icons/fa";

import Container from "../layout/Container";

function Stats() {
  const stats = [
    {
      icon: FaBookOpen,
      value: "120+",
      label: "Fitness Articles",
    },
    {
      icon: FaDumbbell,
      value: "35+",
      label: "Workout Guides",
    },
    {
      icon: FaAppleAlt,
      value: "50+",
      label: "Nutrition Tips",
    },
    {
      icon: FaHeartbeat,
      value: "100%",
      label: "Evidence-Based",
    },
  ];

  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-green-500"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 transition group-hover:bg-green-600 group-hover:text-white dark:bg-green-950/40 dark:text-green-400">
                  <Icon size={22} />
                </div>

                <h3 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            );
          })}

        </div>
      </Container>
    </section>
  );
}

export default Stats;