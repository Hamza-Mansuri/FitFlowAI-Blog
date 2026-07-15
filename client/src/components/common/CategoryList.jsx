import Container from "../layout/Container";

function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Workout",
    "Nutrition",
    "Recovery",
    "Health",
    "Lifestyle",
  ];

  return (
    <section className="pb-12">
      <Container>

        <div className="mt-4 mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Explore Topics
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Filter articles by fitness goals and wellness topics.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-md"
                    : "border border-green-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-green-600 hover:bg-green-50 hover:text-green-700 hover:shadow"
                }`}
            >
              {category}
            </button>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default CategoryList;