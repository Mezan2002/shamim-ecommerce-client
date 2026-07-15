import CategoryColumn from "./CategoryColumn";
import DownloadAppColumn from "./DownloadAppColumn";
import LogoInfoColumn from "./LogoInfoColumn";
import PopularTagColumn from "./PopularTagColumn";
import QuickLinksColumn from "./QuickLinksColumn";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-[70%] mx-auto py-18">
        <div className="flex gap-12">
          <LogoInfoColumn />
          <CategoryColumn />
          <QuickLinksColumn />
          <DownloadAppColumn />
          <PopularTagColumn />
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-[70%] mx-auto py-6 text-center">
          <p className="body-small-400 text-gray-500">
            Kinbo-eCommerce Template &copy; 2021. Design by Templatecookie
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
