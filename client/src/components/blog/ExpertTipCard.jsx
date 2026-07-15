import { FaLightbulb } from "react-icons/fa";

function ExpertTipCard({ tip }) {
  if (!tip || tip.trim() === "") return null;

  return (
    <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-green-200 bg-green-50 p-7">

      <div className="flex items-center gap-3">

        <FaLightbulb className="text-2xl text-green-600" />

        <h3 className="text-2xl font-bold text-slate-900">
          Expert Tip
        </h3>

      </div>

      <p className="mt-4 text-lg leading-8 text-slate-700">
        {tip}
      </p>

    </div>
  );
}

export default ExpertTipCard;