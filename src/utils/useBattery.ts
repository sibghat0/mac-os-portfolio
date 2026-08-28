import { useEffect } from "react";
import { systemStore } from "@/composable/useSystem"; // Import the store directly

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: (e: Event) => void): void;
  removeEventListener(type: string, listener: (e: Event) => void): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export const useBattery = () => {
  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;

    if (!nav.getBattery) {
      console.log("Battery API not supported");
      return;
    }

    let battery: BatteryManager;

    const updateBattery = () => {
      systemStore.setState((s) => ({
        ...s,
        batteryLevel: Math.round(battery.level * 100),
        isCharging: battery.charging,
      }));
    };

    nav.getBattery().then((bat) => {
      battery = bat;
      updateBattery();
      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", updateBattery);
        battery.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);
};
