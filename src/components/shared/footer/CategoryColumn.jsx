import { ArrowRightIcon } from "@phosphor-icons/react";
import { TOP_CATEGORIES } from "./constants";

const CategoryColumn = () => {
  return (
    <div className="flex-1">
      <h4 className="text-gray-00 label-02 mb-3">TOP CATEGORY</h4>
      <ul className="flex flex-col gap-3">
        {TOP_CATEGORIES.map((category) => (
          <li key={category}>
            <a
              href="#"
              className={`body-small-500 text-gray-400 hover:text-gray-00 py-1.5 transition-colors ${
                category === "Accessories"
                  ? "text-gray-00 font-medium flex items-center gap-2"
                  : ""
              }`}
            >
              {category === "Accessories" ? (
                <hr className="w-6 h-px text-warning-500" />
              ) : (
                ""
              )}
              {category}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="inline-flex items-center gap-2 mt-6 body-small-500 text-warning-500 hover:text-warning-600 transition-colors"
      >
        Browse All Product <ArrowRightIcon size={16} />
      </a>
    </div>
  );
};

export default CategoryColumn;
