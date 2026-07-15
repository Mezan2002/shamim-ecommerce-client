const DownloadAppColumn = () => {
  return (
    <div className="flex-1">
      <h4 className="text-gray-00 label-02 mb-4.5">DOWNLOAD APP</h4>
      <div className="flex flex-col gap-3">
        <a href="/">
          <img
            src="/images/get-it-now-google-play.png"
            alt="Get it now on Google Play"
            className="h-17.5 w-44"
          />
        </a>
        <a href="/">
          <img
            src="/images/get-it-now-app-store.png"
            alt="Get it now on App Store"
            className="h-17.5 w-44"
          />
        </a>
      </div>
    </div>
  );
};

export default DownloadAppColumn;
