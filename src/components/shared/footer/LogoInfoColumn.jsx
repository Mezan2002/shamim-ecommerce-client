import { PhoneCallIcon, MapPinIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { CONTACT_INFO } from "./constants";

const LogoInfoColumn = () => {
  return (
    <div className="flex flex-col gap-5">
      <a href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-warning-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-900 rounded-full" />
        </div>
        <span className="text-gray-00 heading-02 tracking-wide">SHAMIM</span>
      </a>

      <div>
        <p className="body-small-400 text-gray-400">Customer Supports:</p>
        <p className="text-gray-00 body-large-500 mt-1">{CONTACT_INFO.phone}</p>
      </div>

      <div className="flex items-start gap-2">
        <MapPinIcon size={20} className="text-gray-400 mt-0.5 shrink-0" />
        <p className="body-small-400 text-gray-400 whitespace-pre-line">
          {CONTACT_INFO.address}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <EnvelopeSimpleIcon size={20} className="text-gray-400 shrink-0" />
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="body-small-400 text-gray-00 hover:text-warning-500 transition-colors"
        >
          {CONTACT_INFO.email}
        </a>
      </div>
    </div>
  );
};

export default LogoInfoColumn;
