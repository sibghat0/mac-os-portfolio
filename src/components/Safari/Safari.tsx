import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Sidebar,
  WifiOff,
} from "lucide-react";
import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";
import { useSystem } from "@/composable/useSystem";

export default function Safari() {
  const [inputUrl, setInputUrl] = useState("https://www.wikipedia.org");
  const [currentUrl, setCurrentUrl] = useState("https://www.wikipedia.org");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { wifiEnabled, setWifiEnabled } = useSystem();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl.trim();

    if (!finalUrl.includes(".")) {
      finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(finalUrl)}`;
    } else if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    setCurrentUrl(finalUrl);
    setInputUrl(finalUrl);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <WindowWrapper
      appId="safari"
      title="Safari"
      defaultWidth={950}
      defaultHeight={630}
    >
      {!wifiEnabled ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#1c1c1e] text-gray-200">
          <WifiOff size={48} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            You are not connected to the internet
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center max-w-md">
            Safari requires an active internet connection to load web pages.
            Turn on Wi-Fi to continue browsing.
          </p>
          <button
            onClick={() => setWifiEnabled(true)}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Turn On Wi-Fi
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full bg-white">
          {/* Safari Toolbar */}
          <div className="h-12 bg-[#2d2d2d] flex items-center px-4 gap-4 border-b border-black/20">
            <Sidebar
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <ChevronLeft
                size={20}
                className="text-gray-500 cursor-not-allowed"
              />
              <ChevronRight
                size={20}
                className="text-gray-500 cursor-not-allowed"
              />
            </div>
            {/* Address Bar */}
            <form
              onSubmit={handleNavigate}
              className="flex-1 max-w-2xl mx-auto relative flex items-center"
            >
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full h-7 bg-[#1c1c1c] text-gray-200 text-sm text-center rounded-md outline-none focus:bg-[#242424] focus:text-left focus:pl-8 px-4 transition-all"
                placeholder="Search or enter website name"
              />
              {/* Absolute positioned refresh button inside the input */}
              <RotateCw
                size={14}
                className="absolute right-3 text-gray-400 hover:text-white cursor-pointer"
                onClick={handleRefresh}
              />
            </form>
            <div className="w-16" /> {/* Spacer to balance the toolbar */}
          </div>

          {/* Browser Content */}
          <div className="flex-1 w-full bg-white relative">
            <iframe
              ref={iframeRef}
              src={currentUrl}
              title="Safari Browser"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              className="w-full h-full border-none bg-white"
            />
          </div>
        </div>
      )}
    </WindowWrapper>
  );
}
