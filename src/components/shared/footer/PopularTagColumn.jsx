import { POPULAR_TAGS } from "./constants";

const PopularTagColumn = () => {
  return (
    <div>
      <h4 className="text-gray-00 heading-06 mb-6">POPULAR TAG</h4>
      <div className="flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <a
            key={tag}
            href="#"
            className={`body-tiny-500 px-3 py-1.5 rounded border transition-colors ${
              tag === "Graphics Card"
                ? "border-warning-500 text-warning-500 bg-warning-500/10"
                : "border-gray-600 text-gray-400 hover:border-gray-00 hover:text-gray-00"
            }`}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularTagColumn;
