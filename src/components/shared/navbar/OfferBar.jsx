import { X } from "@phosphor-icons/react";
import Button from "@/components/ui/Button/Button";
import { NAVBAR } from "./constants";

const OfferBar = () => {
  return (
    <div className="bg-gray-900 w-full py-4 relative">
      <div className="max-w-[70%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-warning-300 inline-block py-1.5 px-2.5 -rotate-3">
            <p className="body-xl-600 text-gray-900">Black</p>
          </div>
          <p className="heading-03 text-gray-00">Friday</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="body-small-500 text-gray-00">Up to</span>
          <h6 className="text-warning-500 display-04">{NAVBAR.offer.discount}</h6>
          <p className="body-xl-600 text-gray-00">OFF</p>
        </div>

        <Button>{NAVBAR.offer.ctaText}</Button>

        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-800 p-2 text-gray-00 rounded-xs">
          <X size={20} />
        </div>
      </div>
    </div>
  );
};

export default OfferBar;
