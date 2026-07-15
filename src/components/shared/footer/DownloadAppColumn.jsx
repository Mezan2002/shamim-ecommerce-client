const DownloadAppColumn = () => {
  return (
    <div>
      <h4 className="text-gray-00 heading-06 mb-6">DOWNLOAD APP</h4>
      <div className="flex flex-col gap-3">
        <a href="#" className="block bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg px-4 py-3 w-48">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.394 13l2.304-3.492zM5.864 2.658L16.8 9.002l-2.302 2.302L5.864 2.658z" fill="#fff"/>
            </svg>
            <div>
              <p className="text-gray-400 text-[10px] leading-tight">Get it now</p>
              <p className="text-gray-00 body-medium-500 leading-tight">Google Play</p>
            </div>
          </div>
        </a>
        <a href="#" className="block bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg px-4 py-3 w-48">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#fff"/>
            </svg>
            <div>
              <p className="text-gray-400 text-[10px] leading-tight">Get it now</p>
              <p className="text-gray-00 body-medium-500 leading-tight">App Store</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DownloadAppColumn;
