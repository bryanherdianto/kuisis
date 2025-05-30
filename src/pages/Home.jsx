import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import CategoryCard from "../components/CategoryCard";

function Home() {
  const { categories, loading, error } = useQuiz();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose a Quiz Category</h1>
        <p className="text-gray-600">Select a category to begin your quiz journey</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
          <p>Please try reloading the page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}

          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-600">
              No categories found matching "{searchTerm}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
