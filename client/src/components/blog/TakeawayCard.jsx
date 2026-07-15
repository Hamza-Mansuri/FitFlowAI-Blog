import { FaCheckCircle } from "react-icons/fa";

function TakeawayCard({ takeaways }) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="mx-auto mt-12 max-w-4xl">

      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
        Key Takeaways
      </h2>

      <div className="mt-6 space-y-4">

        {takeaways.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >

            <FaCheckCircle className="text-green-600 flex-shrink-0 dark:text-green-400" />

            <span className="text-slate-700 dark:text-slate-300">
              {item}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TakeawayCard;