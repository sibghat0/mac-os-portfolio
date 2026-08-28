import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreHorizontal } from "lucide-react";
import { useDocker } from "@/composable/useDocker";

import finderIcon from "@/assets/images/docker/Finder.svg";
import appIcon from "@/assets/images/docker/Apps.svg";
import mailIcon from "@/assets/images/docker/Mail.svg";
import mapIcon from "@/assets/images/docker/Maps.svg";
import terminalIcon from "@/assets/images/docker/Terminal.svg";
import safariIcon from "@/assets/images/docker/Safari.svg";
import codeIcon from "@/assets/images/docker/vs_code.svg";
import settingsIcon from "@/assets/images/docker/System.svg";
import trashIcon from "@/assets/images/docker/Empty_Bin.svg";

interface AppItem {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const apps: AppItem[] = [
  { id: "finder", name: "Finder", icon: finderIcon, category: "Utilities" },
  { id: "launchpad", name: "Launchpad", icon: appIcon, category: "Utilities" },
  { id: "maps", name: "Maps", icon: mapIcon, category: "Social" },
  {
    id: "email",
    name: "Mail",
    icon: mailIcon,
    category: "Productivity & Finance",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: terminalIcon,
    category: "Developer Tools",
  },
  {
    id: "safari",
    name: "Safari",
    icon: safariIcon,
    category: "Productivity & Finance",
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: codeIcon,
    category: "Developer Tools",
  },
  {
    id: "settings",
    name: "System Settings",
    icon: settingsIcon,
    category: "Utilities",
  },
  { id: "trash", name: "Trash", icon: trashIcon, category: "Utilities" },
];

const categories = [
  "All",
  "Productivity & Finance",
  "Developer Tools",
  "Utilities",
  "Social",
  "Entertainment",
  "Creative",
];

export default function ApplicationsPopover() {
  const {
    isAppsPopoverOpen,
    setIsAppsPopoverOpen,
    appOpen,
    setAppOpen,
    appMinimized,
    setAppMinimized,
  } = useDocker();

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      activeCategory === "All" || app.category === activeCategory;
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAppClick = (appId: string) => {
    if (!appOpen.includes(appId)) setAppOpen([...appOpen, appId]);
    if (appMinimized.includes(appId))
      setAppMinimized(appMinimized.filter((id) => id !== appId));

    setIsAppsPopoverOpen(false);
    setSearchQuery("");
  };

  return (
    <AnimatePresence>
      {isAppsPopoverOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-28 left-1/4 -translate-x-1/2 z-40 w-[480px] bg-[#242424]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-visible text-white select-none"
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex items-center gap-2.5 flex-1">
              <Search size={20} className="text-gray-300 fill-gray-300/20" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Applications"
                autoFocus
                className="bg-transparent border-none outline-none text-lg font-medium tracking-tight text-gray-100 placeholder:text-gray-300 w-full"
              />
            </div>
            <button className="text-gray-400 hover:text-white p-1 rounded-full border border-gray-600">
              <MoreHorizontal size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-px bg-white/10 w-full mt-1" />

          <div className="p-5 grid grid-cols-5 gap-y-6 gap-x-2 min-h-[300px] max-h-[360px] overflow-y-auto no-scrollbar">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center gap-1.5 p-1 rounded-xl  transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-contain drop-shadow-md "
                      draggable={false}
                    />
                  </div>
                  <span className="text-[10px] text-gray-300 text-center leading-tight line-clamp-2 px-1">
                    {app.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-5 flex items-center justify-center text-sm text-gray-400 h-full">
                No applications found
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
