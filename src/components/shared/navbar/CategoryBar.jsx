import {
  ArrowsClockwiseIcon,
  CaretDownIcon,
  HeadphonesIcon,
  InfoIcon,
  MapPinLineIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react";
import { CONTACT, NAVBAR, SUPPORT_LINKS } from "./constants";

const iconMap = {
  MapPinLineIcon,
  ArrowsClockwiseIcon,
  HeadphonesIcon,
  InfoIcon,
};

const CategoryBar = () => {
  return (
    <div className="py-4 border-b border-gray-100 bg-gray-00">
      <div className="max-w-[70%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-gray-50 py-3.5 px-6 inline-flex items-center gap-2">
            <p>{NAVBAR.category.label}</p>
            <CaretDownIcon size={16} className="text-gray-900" />
          </div>

          <div className="flex items-center gap-6">
            {SUPPORT_LINKS.map(({ label, icon }) => {
              const Icon = iconMap[icon];
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="text-gray-600" size={24} />
                  <p className="text-gray-600 body-small-400">{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PhoneCallIcon className="text-gray-900" size={28} />
          <p className="text-gray-900 body-large-400">{CONTACT.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
