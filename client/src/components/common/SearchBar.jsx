import { FaSearch } from "react-icons/fa";
import Container from "../layout/Container";

function SearchBar({ search, setSearch }) {
  return (
    <section className="-mt-6 mb-3">
      <Container>
        <div className="mx-auto max-w-3xl">

          <div className="flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-300 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 dark:border-slate-800 dark:bg-slate-950">

            <div className="px-5 text-gray-400">
              <FaSearch size={18} />
            </div>

            <input
              type="text"
              placeholder="Search workouts, nutrition, health..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 pr-5 text-base bg-transparent outline-none placeholder:text-gray-450 dark:text-white"
            />

          </div>

        </div>
      </Container>
    </section>
  );
}

export default SearchBar;