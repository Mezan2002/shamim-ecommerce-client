import { QUICK_LINKS } from "./constants";

const QuickLinksColumn = () => {
  return (
    <div>
      <h4 className="text-gray-00 heading-06 mb-6">QUICK LINKS</h4>
      <ul className="flex flex-col gap-3">
        {QUICK_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="body-small-400 text-gray-400 hover:text-gray-00 transition-colors"
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
