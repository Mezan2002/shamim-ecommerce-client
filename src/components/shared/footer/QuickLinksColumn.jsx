import { QUICK_LINKS } from "./constants";

const QuickLinksColumn = () => {
  return (
    <div className="flex-1">
      <h4 className="text-gray-00 label-02 mb-3">QUICK LINKS</h4>
      <ul className="flex flex-col gap-3">
        {QUICK_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="body-small-500 py-1.5 text-gray-400 hover:text-gray-00 transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinksColumn;
