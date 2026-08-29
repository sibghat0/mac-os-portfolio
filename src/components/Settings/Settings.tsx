import {
  Search,
  Wifi,
  Bluetooth,
  Battery,
  Settings as GeneralIcon,
  Monitor,
  Image as WallpaperIcon,
  Lock,
  ChevronRight,
  Check,
  ChevronLeft,
} from "lucide-react";
import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";
import { useSystem } from "@/composable/useSystem";
import w1 from "@/assets/images/wallpaper/w1.jpg";
import w2 from "@/assets/images/wallpaper/w2.png";
import w3 from "@/assets/images/wallpaper/w3.jpg";
import w4 from "@/assets/images/wallpaper/w4.png";
import w5 from "@/assets/images/wallpaper/w5.jpg";
import w6 from "@/assets/images/wallpaper/w6.jpg";
import w7 from "@/assets/images/wallpaper/w7.jpg";
import w8 from "@/assets/images/lockScreen/Itachi.jpg";
import w9 from "@/assets/images/lockScreen/Late.jpg";

const MENU_ITEMS = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi, color: "bg-blue-500" },
  {
    id: "bluetooth",
    label: "Bluetooth",
    icon: Bluetooth,
    color: "bg-blue-500",
  },
  { id: "battery", label: "Battery", icon: Battery, color: "bg-green-500" },
  { id: "general", label: "General", icon: GeneralIcon, color: "bg-gray-500" },
  { id: "displays", label: "Displays", icon: Monitor, color: "bg-blue-500" },
  {
    id: "wallpaper",
    label: "Wallpaper",
    icon: WallpaperIcon,
    color: "bg-cyan-500",
  },
  { id: "lockScreen", label: "Lock Screen", icon: Lock, color: "bg-gray-500" },
];

const WALLPAPERS = [
  {
    id: "monterey",
    name: "Monterey SVG",
    url: w1,
  },
  {
    id: "monterey",
    name: "Monterey SVG",
    url: w2,
  },
  {
    id: "ventura",
    name: "Ventura SVG",
    url: w3,
  },
  {
    id: "sonoma",
    name: "Sonoma SVG",
    url: w4,
  },
  {
    id: "mojave",
    name: "Mojave SVG",
    url: w5,
  },
  {
    id: "big-sur",
    name: "Big Sur SVG",
    url: w6,
  },
  {
    id: "monterey",
    name: "Monterey SVG",
    url: w7,
  },
  {
    id: "itachi",
    name: "Itachi",
    url: w8,
  },
  {
    id: "late",
    name: "Late",
    url: w9,
  },
];

export default function Settings() {
  const {
    wallpaper,
    setWallpaper,
    lockScreenWallpaper,
    setLockScreenWallpaper,
    wifiEnabled,
    setWifiEnabled,
    batteryLevel,
    isCharging,
    settingsActiveTab: activeTab,
    setSettingsActiveTab: setActiveTab,
    settingsGeneralSubView: generalSubView,
    setSettingsGeneralSubView: setGeneralSubView,
  } = useSystem();

  const renderContent = () => {
    switch (activeTab) {
      case "wifi":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${wifiEnabled ? "bg-blue-500" : "bg-gray-600"}`}
                >
                  <Wifi size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">Wi-Fi</div>
                  <div className="text-xs text-gray-400">
                    {wifiEnabled ? "Connected" : "Off"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${wifiEnabled ? "bg-blue-500" : "bg-gray-600"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${wifiEnabled ? "left-6" : "left-1"}`}
                />
              </button>
            </div>

            {wifiEnabled && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 mb-2 px-1">
                  Known Networks
                </h3>
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  {["JioFiber-Sibghat", "sibghat_5G"].map((network, i) => (
                    <div
                      key={network}
                      className={`flex items-center justify-between p-3 ${i !== 0 ? "border-t border-white/10" : ""}`}
                    >
                      <div className="text-sm text-gray-200">{network}</div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <Lock size={14} />
                        <Wifi size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "battery":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
              <span className="text-sm text-gray-200">Low Power Mode</span>
              <span className="text-sm text-gray-400">Never</span>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-medium text-gray-200">
                  Battery Level
                </span>
                <span className="text-2xl font-light text-gray-100">
                  {batteryLevel}% {isCharging && "⚡"}
                </span>
              </div>
              <div className="h-32 flex items-end gap-1 mb-2">
                {[40, 60, 80, 100, 95, 90, 85, batteryLevel].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-green-500 rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case "general":
        if (generalSubView === "about") {
          return (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setGeneralSubView("main")}
                className="flex items-center gap-1 text-gray-400 hover:text-white mb-6"
              >
                <ChevronLeft size={16} /> General
              </button>

              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center border-4 border-gray-800 mb-4 shadow-xl">
                  <span className="text-4xl text-white font-bold">M2</span>
                </div>
                <h2 className="text-2xl font-medium text-gray-200">
                  MacBook Air
                </h2>
                <p className="text-sm text-gray-400">13-inch, M2, 2022</p>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden text-sm">
                <div className="flex p-3 border-b border-white/10">
                  <span className="w-32 text-gray-400">Chip</span>
                  <span className="text-gray-200 font-medium">Apple M2</span>
                </div>
                <div className="flex p-3 border-b border-white/10">
                  <span className="w-32 text-gray-400">Memory</span>
                  <span className="text-gray-200 font-medium">16 GB</span>
                </div>
                <div className="flex p-3 border-b border-white/10">
                  <span className="w-32 text-gray-400">macOS</span>
                  <span className="text-gray-200 font-medium">Sonoma 14.5</span>
                </div>
                <div className="flex p-3">
                  <span className="w-32 text-gray-400">Display</span>
                  <span className="text-gray-200 font-medium">
                    Built-in Liquid Retina Display (2560 × 1664)
                  </span>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center mb-8 mt-4">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mb-3">
                <GeneralIcon size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-medium text-gray-200">General</h2>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <div
                onClick={() => setGeneralSubView("about")}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5"
              >
                <span className="text-sm text-gray-200">About</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
              <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 border-t border-white/10">
                <span className="text-sm text-gray-200">Software Update</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        );
      case "wallpaper":
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-medium text-gray-200 mb-4">
              Desktop Pictures
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {WALLPAPERS.map((wp) => (
                <div key={wp.id} className="flex flex-col gap-2">
                  <div
                    onClick={() => setWallpaper(wp.url)}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer relative border-2 transition-all ${
                      wallpaper === wp.url
                        ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    <img
                      src={wp.url}
                      alt={wp.name}
                      className="w-full h-full object-cover"
                    />

                    {wallpaper === wp.url && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-0.5 shadow-md">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-300">
                    {wp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "lockScreen":
        return (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-medium text-gray-200 mb-4">
              Lock Screen Picture
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {WALLPAPERS.map((wp) => (
                <div key={wp.id} className="flex flex-col gap-2">
                  <div
                    onClick={() => setLockScreenWallpaper(wp.url)}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer relative border-2 transition-all ${
                      lockScreenWallpaper === wp.url
                        ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    <img
                      src={wp.url}
                      alt={wp.name}
                      className="w-full h-full object-cover"
                    />
                    {lockScreenWallpaper === wp.url && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-0.5 shadow-md">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-300">
                    {wp.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-gray-400 text-center mt-20">
            Select an item from the sidebar.
          </div>
        );
    }
  };

  return (
    <WindowWrapper
      appId="settings"
      title="System Settings"
      defaultWidth={900}
      defaultHeight={650}
    >
      <div className="flex w-full h-full bg-[#1e1e1e] text-gray-200 font-sans">
        {/* Sidebar */}
        <div className="w-64 bg-[#252526]/80 backdrop-blur-xl border-r border-black/40 flex flex-col z-10 flex-shrink-0">
          <div className="px-3 pt-3 pb-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full h-7 bg-black/20 border border-white/10 rounded-md pl-8 pr-3 text-[12px] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-lg font-medium shadow-inner">
                SK
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-gray-200">
                  Sibghatullah Khan
                </span>
                <span className="text-[11px] text-gray-400">Apple Account</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 no-scrollbar">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setGeneralSubView("main");
                  }}
                  className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors ${activeTab === item.id ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-white/10"}`}
                >
                  <div
                    className={`p-1 rounded bg-gradient-to-b from-white/20 to-transparent shadow-sm ${item.color}`}
                  >
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-[13px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#1c1c1e]">
          <div className="px-10 py-8 min-h-full">{renderContent()}</div>
        </div>
      </div>
    </WindowWrapper>
  );
}
