import { useState } from "react";
import moment from "moment";
import ControlCenterIcon from "../../assets/images/control-center-icon.webp";
import WifiIcon from "../../assets/images/wifi.png";
import BatteryIcon from "../../assets/images/battery.png";
import ChargingBatteryIcon from "../../assets/images/charging-battery.png";
import ControlCenterDropdown from "../ControlCenterDropdown/ControlCenterDropdown";
import ApplePopover from "../ApplePopover/ApplePopover";
import { useSystem } from "../../composable/useSystem";

export default function Header() {
  // Pull states directly from the global system store
  const { batteryLevel, isCharging, wifiEnabled, setWifiEnabled } = useSystem();
  const [toggleControlCenter, setToggleControlCenter] = useState(false);

  const formattedDate = moment().format("ddd D MMM h:mm A");

  return (
    <div className="absolute z-50 w-full h-fit flex justify-between px-4 py-2">
      <div className="relative flex text-white opacity-100">
        <ApplePopover />
      </div>
      <div className="relative z-10 flex gap-4 justify-end h-fit items-center text-white">
        <div className="flex gap-1">
          <span className="text-xs items-center flex font-medium">
            {batteryLevel}%
          </span>
          <img
            src={isCharging ? ChargingBatteryIcon : BatteryIcon}
            className="w-6 h-6"
          />
        </div>

        <div
          className="flex relative cursor-pointer"
          onClick={() => setWifiEnabled(!wifiEnabled)}
        >
          <img src={WifiIcon} className="w-5 h-5" />
          {!wifiEnabled && (
            <div className="h-5 w-0.5 absolute left-[10px] -rotate-45 bg-white" />
          )}
        </div>
        <div className="relative">
          <img
            src={ControlCenterIcon}
            className="w-4 h-4 invert cursor-pointer"
            onClick={() => setToggleControlCenter(!toggleControlCenter)}
          />
          {toggleControlCenter && <ControlCenterDropdown />}
        </div>
        <h3 className="text-sm">{formattedDate}</h3>
      </div>
    </div>
  );
}
