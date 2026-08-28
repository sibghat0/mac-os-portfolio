import { Store } from "@tanstack/store";
import { useSelector } from "@tanstack/react-store";
import w1 from "@/assets/images/wallpaper/w1.jpg";

const WALLPAPER_STORAGE_KEY = "macos-clone-wallpaper";

const getInitialWallpaper = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(WALLPAPER_STORAGE_KEY);
    if (saved) return saved;
  }
  return w1;
};

export const systemStore = new Store({
  wifiEnabled: true,
  batteryLevel: 88,
  isCharging: false,
  wallpaper: getInitialWallpaper(),
});

export const useSystem = () => {
  const wifiEnabled = useSelector(systemStore, (state) => state.wifiEnabled);
  const batteryLevel = useSelector(systemStore, (state) => state.batteryLevel);
  const isCharging = useSelector(systemStore, (state) => state.isCharging);
  const wallpaper = useSelector(systemStore, (state) => state.wallpaper);

  const setWifiEnabled = (enabled: boolean) =>
    systemStore.setState((s) => ({ ...s, wifiEnabled: enabled }));

  const setBatteryLevel = (level: number) =>
    systemStore.setState((s) => ({ ...s, batteryLevel: level }));

  const setIsCharging = (charging: boolean) =>
    systemStore.setState((s) => ({ ...s, isCharging: charging }));

  const setWallpaper = (bg: string) => {
    localStorage.setItem(WALLPAPER_STORAGE_KEY, bg);
    systemStore.setState((s) => ({ ...s, wallpaper: bg }));
  };

  return {
    wifiEnabled,
    setWifiEnabled,
    batteryLevel,
    setBatteryLevel,
    isCharging,
    setIsCharging,
    wallpaper,
    setWallpaper,
  };
};
