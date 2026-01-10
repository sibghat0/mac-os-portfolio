import { useState } from "react";
import moment from "moment";
import ControlCenterIcon from "../../assets/images/control-center-icon.webp";
import WifiIcon from "../../assets/images/wifi.png";
import BatteryIcon from "../../assets/images/battery.png";
import ChargingBatteryIcon from "../../assets/images/charging-battery.png";
import { useBattery } from "../../utils/useBattery";
import { AppleLogoIcon } from "../../utils/Icons";

export default function Header() {
  const { level, charging } = useBattery();

  const [toggleWifi, setToggleWifi] = useState(false);

  const formattedDate = moment().format("ddd D MMM h:mm A");

  return (
    <div className="absolute w-full h-full flex justify-between px-4 py-1">
      <div className="relative flex text-white opacity-100">
        <AppleLogoIcon />
      </div>
      <div className="relative z-10 flex gap-4 justify-end h-fit items-center text-white">
        <div className="flex gap-1">
          <span className="text-xs items-center flex font-medium">
            {level}%
          </span>
          <img
            src={charging ? ChargingBatteryIcon : BatteryIcon}
            className="w-6 h-6"
          />
        </div>

        <div
          className="flex cursor-pointer"
          onClick={() => setToggleWifi(!toggleWifi)}
        >
          <img src={WifiIcon} className="w-5 h-5" />
          {toggleWifi && (
            <div className="h-5 w-0.5 absolute left-[86px] -rotate-45 bg-white" />
          )}
        </div>

        <img src={ControlCenterIcon} className="w-4 h-4 invert" />
        <h3 className="text-sm">{formattedDate}</h3>
      </div>
    </div>
  );
}
