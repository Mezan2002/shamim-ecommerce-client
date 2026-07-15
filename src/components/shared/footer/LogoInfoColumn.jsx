import { CONTACT_INFO } from "./constants";

const LogoInfoColumn = () => {
  return (
    <div className="flex flex-col gap-5">
      <a href="/" className="flex items-center gap-2">
        <img
          src="/images/footer-logo.png"
          alt="Footer logo"
          className="w-48 h-12"
        />
      </a>

      <div>
        <p className="body-small-400 text-gray-500">Customer Supports:</p>
        <p className="text-gray-00 body-large-500 mt-1">{CONTACT_INFO.phone}</p>
      </div>

      <p className="body-medium-400 text-gray-300 whitespace-pre-line">
        {CONTACT_INFO.address}
      </p>

      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="body-medium-500 text-gray-00 hover:text-warning-500 transition-colors"
      >
        {CONTACT_INFO.email}
      </a>
    </div>
  );
};

export default LogoInfoColumn;
