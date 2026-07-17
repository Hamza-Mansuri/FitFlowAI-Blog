import { FaShoppingBasket, FaCheck } from "react-icons/fa";

function ShoppingList({ list }) {
  if (!list || list.length === 0) return null;

  // Group items by category
  const categories = list.reduce((acc, curr) => {
    const cat = curr.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {});

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <FaShoppingBasket size={16} />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Weekly Grocery Shopping List
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
            Grouped grocery items required for this meal program.
          </p>
        </div>
      </div>

      {/* Grocery Items List */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(categories).map(([category, items], idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight border-l-3 border-emerald-500 pl-2.5">
              {category}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pl-1">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-center justify-between py-1.5 border-b border-slate-200/20">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <FaCheck size={7} />
                    </span>
                    <span className="text-slate-850 dark:text-slate-350">{item.item}</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ShoppingList;
