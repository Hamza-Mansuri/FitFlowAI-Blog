import { FaCheckCircle } from "react-icons/fa";

function TakeawayCard({ takeaways }) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="mx-auto mt-12 max-w-4xl">

      <h2 className="text-3xl font-bold text-slate-900">
        Key Takeaways
      </h2>

      <div className="mt-6 space-y-4">

        {takeaways.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <FaCheckCircle className="text-green-600 flex-shrink-0" />

            <span className="text-slate-700">
              {item}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TakeawayCard;