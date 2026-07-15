import { ArrowRight } from "@phosphor-icons/react";
import { TOP_CATEGORIES } from "./constants";

const CategoryColumn = () => {
  return (
    <div>
      <h4 className="text-gray-00 heading-06 mb-6">TOP CATEGORY</h4>
      <ul className="flex flex-col gap-3">
        {TOP_CATEGORIES.map((category) => (
          <li key={category}>
            <a
              href="#"
              className={`body-small-400 text-gray-400 hover:text-gray-00 transition-colors ${
                category === "Accessories"
                  ? "pl-4 border-l-2 border-warning-500 text-gray-00 font-medium"
                  : ""
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="inline-flex items-center gap-2 mt-6 body-medium-500 text-warning-500 hover:text-warning-600 transition-colors"
      >
        Browse All Product <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default CategoryColumn;
