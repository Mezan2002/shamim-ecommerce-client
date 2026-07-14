import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { NAVBAR } from "./constants";

const LogoBar = () => {
  return (
    <div className="bg-secondary-700 py-5">
      <div className="max-w-[70%] mx-auto flex items-center justify-between">
        <img
          src="/images/logo.png"
          alt="Shamim E-commerce Logo"
          className="h-12"
        />

        <div className="w-1/2 bg-gray-00 flex items-center">
          <div className="py-4 px-5 flex items-center justify-between gap-3 w-full">
            <input
              className="placeholder:text-gray-500 body-small-400 outline-none w-full"
              placeholder={NAVBAR.search.placeholder}
            />
            <MagnifyingGlassIcon size={20} />
          </div>
        </div>

        <div className="flex items-center gap-6 text-gray-00">
          <ShoppingCartIcon
            size={32}
            className="cursor-pointer hover:text-warning-500 transition-colors"
          />
          <HeartIcon
            size={32}
            className="cursor-pointer hover:text-warning-500 transition-colors"
          />
          <UserIcon
            size={32}
            className="cursor-pointer hover:text-warning-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoBar;
