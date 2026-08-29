import React, { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Settings,
  Moon,
  Play,
  Power,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { AppleLogoIcon } from "@/utils/Icons";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";
import { useWindow } from "@/composable/useWindow";
import { useDocker } from "@/composable/useDocker";
import { useSystem } from "@/composable/useSystem";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  badge?: string;
  shortcut?: string;
  rightIcon?: LucideIcon;
  onClick?: () => void;
}

export default function ApplePopover() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { currentWindow, setCurrentWindow } = useWindow();
  const { appOpen, setAppOpen, setActiveApp } = useDocker();
  const { setSettingsActiveTab, setSettingsGeneralSubView } = useSystem();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleOpenAbout = () => {
    if (!appOpen.includes("settings")) {
      setAppOpen([...appOpen, "settings"]);
    }
    setActiveApp("settings");
    setSettingsActiveTab("general");
    setSettingsGeneralSubView("about");
    setIsOpen(false);
  };

  const handleOpenSettings = () => {
    if (!appOpen.includes("settings")) {
      setAppOpen([...appOpen, "settings"]);
    }
    setActiveApp("settings");
    setIsOpen(false);
  };

  const lockScreen = () => {
    setCurrentWindow(CURRENT_WINDOW_TYPE.LOCKSCREEN);
    setIsOpen(false);
  };

  const handleSleep = () => {
    setCurrentWindow(CURRENT_WINDOW_TYPE.SLEEP);
    setIsOpen(false);
  };

  const handleShutDown = () => {
    setCurrentWindow(CURRENT_WINDOW_TYPE.SHUTDOWN);
    setIsOpen(false);
  };

  const menuGroups: MenuItem[][] = [
    [{ label: "About This Mac", icon: Monitor, onClick: handleOpenAbout }],
    [
      {
        label: "System Settings...",
        icon: Settings,
        onClick: handleOpenSettings,
      },
    ],
    [
      { label: "Sleep", icon: Moon, onClick: handleSleep },
      { label: "Restart...", icon: Play, onClick: handleShutDown },
      { label: "Shut Down...", icon: Power, onClick: handleShutDown },
    ],
    [
      {
        label: "Lock Screen",
        icon: Lock,
        onClick: lockScreen,
      },
      // { label: "Log Out sibghat khan...", icon: User, onClick: () => console.log("Log Out clicked") },
    ],
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() =>
          currentWindow !== CURRENT_WINDOW_TYPE.LOCKSCREEN && setIsOpen(!isOpen)
        }
        className={`px-3 py-1 flex items-center justify-center rounded-full transition-colors ${
          isOpen ? "bg-white/20" : "hover:bg-white/10"
        }`}
      >
        <AppleLogoIcon />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-gray-600/50 bg-[#1e1e20]/90 backdrop-blur-xl shadow-2xl py-1 z-50 text-[13px] text-gray-200 font-medium">
          {menuGroups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              <div className="px-1.5">
                {group.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white group transition-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        size={14}
                        className={`text-gray-400 group-hover:text-white `}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center text-gray-400 group-hover:text-white tracking-widest text-[11px]">
                      {item.badge && (
                        <span className="bg-gray-600/60 text-gray-300 group-hover:bg-white/20 group-hover:text-white text-[10px] px-2 py-0.5 rounded-full tracking-normal font-semibold">
                          {item.badge}
                        </span>
                      )}
                      {item.shortcut && <span>{item.shortcut}</span>}
                      {item.rightIcon && <item.rightIcon size={14} />}
                    </div>
                  </button>
                ))}
              </div>
              {groupIndex < menuGroups.length - 1 && (
                <div className="h-px bg-gray-600/50 my-1 mx-3" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
