import { useState, useEffect } from "react";

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
  const [batteryState, setBatteryState] = useState({
    level: 100,
    charging: false,
  });

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;

    if (!nav.getBattery) {
      console.log("Battery API not supported");
      return;
    }

    let battery: BatteryManager;

    const updateBattery = () => {
      setBatteryState({
        level: Math.round(battery.level * 100),
        charging: battery.charging,
      });
    };

    nav.getBattery().then((bat) => {
      battery = bat;
      updateBattery();

      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    });

    // Cleanup listeners
    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", updateBattery);
        battery.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  return batteryState;
};
