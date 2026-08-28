import { useState, type FormEvent } from "react";
import {
  Search,
  Map as MapIcon,
  Navigation,
  Compass,
  Route,
  ArrowDownUp,
  Loader2,
  WifiOff,
} from "lucide-react";
import WindowWrapper from "@/components/WindowWrapper/WindowWrapper";
import { useSystem } from "@/composable/useSystem";

export default function Maps() {
  const [mode, setMode] = useState<"search" | "route">("search");
  const [searchQuery, setSearchQuery] = useState("Apple Park, Cupertino");
  const [routeFrom, setRouteFrom] = useState("San Francisco");
  const [routeTo, setRouteTo] = useState("Apple Park");

  const [isLocating, setIsLocating] = useState(false);
  const { wifiEnabled, setWifiEnabled } = useSystem();

  const [iframeSrc, setIframeSrc] = useState(
    "https://maps.google.com/maps?q=Apple%20Park,%20Cupertino&t=&z=15&ie=UTF8&iwloc=&output=embed",
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIframeSrc(
        `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
      );
    }
  };

  const handleRoute = (e: FormEvent) => {
    e.preventDefault();
    if (routeFrom.trim() && routeTo.trim()) {
      setIframeSrc(
        `https://maps.google.com/maps?saddr=${encodeURIComponent(routeFrom)}&daddr=${encodeURIComponent(routeTo)}&output=embed`,
      );
    }
  };

  const swapRoute = () => {
    setRouteFrom(routeTo);
    setRouteTo(routeFrom);
  };

  const handleQuickLink = (place: string) => {
    setMode("search");
    setSearchQuery(place);
    setIframeSrc(
      `https://maps.google.com/maps?q=${encodeURIComponent(place)}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
    );
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setMode("search");
        setSearchQuery("My Location");

        setIframeSrc(
          `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
        );
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to retrieve your location. Please ensure location access is granted in your browser settings.",
        );
        setIsLocating(false);
      },
    );
  };

  return (
    <WindowWrapper
      appId="maps"
      title="Maps"
      defaultWidth={900}
      defaultHeight={600}
    >
      {!wifiEnabled ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#1c1c1e] text-gray-200">
          <WifiOff size={48} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            You are not connected to the internet
          </h2>
          <p className="text-sm text-gray-400 mb-6 text-center max-w-md">
            Maps requires an active internet connection. Turn on Wi-Fi in the
            Control Center or System Settings to continue.
          </p>
          <button
            onClick={() => setWifiEnabled(true)}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Turn On Wi-Fi
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full bg-[#1e1e1e]">
          <div className="w-72 bg-[#2d2d2d]/95 backdrop-blur-xl border-r border-black/50 flex flex-col z-10">
            <div className="px-4 pt-4 pb-2">
              <div className="flex bg-black/40 p-1 rounded-lg">
                <button
                  onClick={() => setMode("search")}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
                    mode === "search"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setMode("route")}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${
                    mode === "route"
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Directions
                </button>
              </div>
            </div>

            <div className="px-4 pb-4 border-b border-white/10">
              {mode === "search" ? (
                <form onSubmit={handleSearch} className="w-full relative mt-2">
                  <Search
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Maps"
                    className="w-full h-8 bg-white/10 border border-white/5 rounded-md pl-8 pr-3 text-[13px] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                  />
                </form>
              ) : (
                <form onSubmit={handleRoute} className="flex gap-2 mt-2">
                  <div className="flex-1 flex flex-col gap-2 relative">
                    <input
                      type="text"
                      value={routeFrom}
                      onChange={(e) => setRouteFrom(e.target.value)}
                      placeholder="Starting point"
                      className="w-full h-8 bg-white/10 border border-white/5 rounded-md px-3 text-[13px] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
                    />
                    <input
                      type="text"
                      value={routeTo}
                      onChange={(e) => setRouteTo(e.target.value)}
                      placeholder="Destination"
                      className="w-full h-8 bg-white/10 border border-white/5 rounded-md px-3 text-[13px] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      type="button"
                      onClick={swapRoute}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      <ArrowDownUp size={14} />
                    </button>
                    <button
                      type="submit"
                      className="p-1.5 text-blue-400 hover:text-white hover:bg-blue-500/30 rounded-md transition-colors mt-1"
                    >
                      <Route size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex-1 p-3 overflow-y-auto no-scrollbar">
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 mt-2">
                Favorites
              </div>
              <div className="space-y-0.5">
                {["Bengaluru", "San Francisco", "New York City", "London"].map(
                  (place) => (
                    <button
                      key={place}
                      onClick={() => handleQuickLink(place)}
                      className="w-full flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-blue-500/90 text-gray-300 hover:text-white transition-colors group"
                    >
                      <MapIcon
                        size={14}
                        className="text-blue-400 group-hover:text-white"
                      />
                      <span className="text-[13px]">{place}</span>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 relative bg-[#e5e3df]">
            <iframe
              title="Map Engine"
              src={iframeSrc}
              className="w-full h-full border-none filter contrast-100 saturate-100"
              loading="lazy"
              allowFullScreen
            />

            <div className="absolute top-4 right-4 flex flex-col gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] rounded-md overflow-hidden bg-[#2d2d2d]/90 backdrop-blur-md border border-white/10">
              <button
                onClick={handleCurrentLocation}
                className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors border-b border-white/10 group"
                title="Show My Location"
              >
                {isLocating ? (
                  <Loader2 size={15} className="animate-spin text-blue-400" />
                ) : (
                  <Navigation
                    size={15}
                    className="group-hover:text-blue-400 transition-colors"
                  />
                )}
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <Compass size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </WindowWrapper>
  );
}
