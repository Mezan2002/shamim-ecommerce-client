import {
  CaretDownIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  PinterestLogoIcon,
  RedditLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { NAVBAR, SOCIAL_LINKS } from "./constants";

const iconMap = {
  TwitterLogoIcon,
  FacebookLogoIcon,
  PinterestLogoIcon,
  RedditLogoIcon,
  YoutubeLogoIcon,
  InstagramLogoIcon,
};

const SocialBar = () => {
  return (
    <div className="bg-secondary-700 py-4 border-b border-gray-500/md">
      <div className="max-w-[70%] mx-auto flex items-center justify-between">
        <p className="text-gray-00 body-small-400">
          {NAVBAR.social.welcomeText}
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <p className="text-gray-00 body-small-400">
              {NAVBAR.social.followText}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, icon, fill }) => {
                const Icon = iconMap[icon];
                return (
                  <Icon
                    key={name}
                    weight={fill ? "fill" : "regular"}
                    className="text-gray-00"
                  />
                );
              })}
            </div>
          </div>

          <div className="h-6 w-0.5 bg-gray-500/md" />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <p className="text-gray-00 body-small-400">Eng</p>
              <CaretDownIcon size={12} className="text-gray-00/80" />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-gray-00 body-small-400">USD</p>
              <CaretDownIcon size={12} className="text-gray-00/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialBar;
