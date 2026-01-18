import { useEffect, useState } from "react";
import WifiIcon from "../../assets/images/wifi.png";

export default function ControlCenterDropdown({
  toggleWifi,
  setToggleWifi,
}: {
  toggleWifi: boolean;
  setToggleWifi: (value: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    const brightnessValue = 0.2 + (brightness / 100) * 0.8;
    document.documentElement.style.filter = `brightness(${brightnessValue})`;
    document.documentElement.style.transition = "filter 0.1s ease-out";

    return () => {
      document.documentElement.style.filter = "brightness(1)";
      document.documentElement.style.transition = "none";
    };
  }, [brightness]);

  return (
    <div className="absolute top-6 -right-20 rounded-lg gap-4 flex flex-col  p-4">
      <div className="flex gap-10 items-center">
        <div className="flex flex-col  gap-4">
          <div
            onClick={() => setToggleWifi(!toggleWifi)}
            className="h-full min-w-44 gap-1 items-center flex p-2 bg-gray-600 cursor-pointer rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-400/20"
          >
            <div
              className={`flex w-10 h-10 relative cursor-pointer ${!toggleWifi ? "bg-white" : "bg-black"} rounded-full p-2`}
            >
              <img
                src={WifiIcon}
                className="w-6 h-6 "
                alt="Wifi"
                style={
                  !toggleWifi
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(2307%) hue-rotate(199deg) brightness(98%) contrast(92%)",
                      }
                    : undefined
                }
              />
            </div>
            <div className="flex flex-col">
              <span>Wi-Fi</span>
              <span>{!toggleWifi ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
          <div
            onClick={() => setToggleWifi(!toggleWifi)}
            className="h-full min-w-44 gap-1 items-center flex p-2 bg-gray-600 cursor-pointer rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-400/20"
          >
            <div
              className={`flex w-10 h-10 relative cursor-pointer ${!toggleWifi ? "bg-white" : "bg-black"} rounded-full p-2`}
            >
              <img
                src={WifiIcon}
                className="w-6 h-6 "
                alt="Wifi"
                style={
                  !toggleWifi
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(2307%) hue-rotate(199deg) brightness(98%) contrast(92%)",
                      }
                    : undefined
                }
              />
            </div>
            <div className="flex flex-col">
              <span>Wi-Fi</span>
              <span>{!toggleWifi ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
        </div>
        <div className="h-36 w-full p-3 bg-gray-600 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-400/20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 bg-gray-500/30 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-500 border border-white/50 shadow-sm" />
            </div>
          </div>

          <div className="flex justify-center items-center gap-5 pb-1">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 19V5l-10 7 10 7zM22 19V5l-10 7 10 7z" />
              </svg>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 19l10-7L4 5v14zm10 0l10-7-10-7v14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col gap-1 py-3 px-4 bg-gray-600 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-400/20">
        <span className="text-xs font-semibold text-white ml-1">Display</span>
        <div className="flex items-center gap-3">
          <svg
            className="text-gray-300"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-none"
            style={{
              background: `linear-gradient(to right, white ${brightness}%, rgba(255, 255, 255, 0.2) ${brightness}%)`,
            }}
          />
          <svg
            className="text-white"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </div>
      </div>

      <div className="h-full w-full flex flex-col gap-1 py-3 px-4 bg-gray-600 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-400/20">
        <span className="text-xs font-semibold text-white ml-1">Sound</span>
        <div className="flex items-center gap-3">
          <svg
            className="text-gray-300"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-none"
            style={{
              background: `linear-gradient(to right, white ${volume}%, rgba(255, 255, 255, 0.2) ${volume}%)`,
            }}
          />
          <svg
            className="text-white"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </div>
      </div>
    </div>
  );
}
