import React, { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Settings,
  Moon,
  Play,
  Power,
  Lock,
  User,
  type LucideIcon,
} from "lucide-react";
import { AppleLogoIcon } from "@/utils/Icons";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  badge?: string;
  shortcut?: string;
  rotateIcon?: boolean;
  rightIcon?: LucideIcon;
}

export default function ApplePopover() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  const menuGroups: MenuItem[][] = [
    [{ label: "About This Mac", icon: Monitor }],
    [{ label: "System Settings...", icon: Settings }],
    [
      { label: "Sleep", icon: Moon },
      { label: "Restart...", icon: Play, rotateIcon: true },
      { label: "Shut Down...", icon: Power },
    ],
    [
      { label: "Lock Screen", icon: Lock },
      { label: "Log Out sibghat khan...", icon: User },
    ],
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
                    className="w-full flex items-center justify-between px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white group transition-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        size={14}
                        className={`text-gray-400 group-hover:text-white ${
                          item.rotateIcon ? "rotate-180" : ""
                        }`}
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
