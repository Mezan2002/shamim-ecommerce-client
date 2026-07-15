import { POPULAR_TAGS } from "./constants";

const PopularTagColumn = () => {
  return (
    <div className="flex-1">
      <h4 className="text-gray-00 label-02 mb-4.5">POPULAR TAG</h4>
      <div className="flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <a
            key={tag}
            href="#"
            className={`body-small-500 px-3 py-1.5 rounded-xs border transition-colors ${
              tag === "Graphics Card"
                ? "border-gray-00 text-gray-00 bg-gray-00/low"
                : "border-gray-800 text-gray-400 hover:border-gray-00 hover:text-gray-00"
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
