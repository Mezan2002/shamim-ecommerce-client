import LogoInfoColumn from "./LogoInfoColumn";
import CategoryColumn from "./CategoryColumn";
import QuickLinksColumn from "./QuickLinksColumn";
import DownloadAppColumn from "./DownloadAppColumn";
import PopularTagColumn from "./PopularTagColumn";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-[70%] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
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
