import React from "react";
import { Plus, X } from "lucide-react";
import type { TabData } from "@/types/terminal.types";

interface TerminalTabsProps {
  tabs: TabData[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  createNewTab: () => void;
  closeTab: (id: string, e?: React.MouseEvent) => void;
}

export default function TerminalTabs({
  tabs,
  activeTabId,
  setActiveTabId,
  createNewTab,
  closeTab,
}: TerminalTabsProps) {
  return (
    <div className="flex items-center px-2 py-1.5 bg-[#2d2d2d]/50 border-b border-black/50 select-none overflow-x-auto no-scrollbar relative">
      <div className="flex flex-1 items-center gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex items-center justify-between gap-4 rounded-md px-3 py-1 text-xs font-sans grow cursor-pointer group transition-colors ${
              activeTabId === tab.id
                ? "bg-[#3a3a3c] text-white border border-white/10 shadow-sm"
                : "text-gray-400 hover:bg-white/5 border border-transparent"
            }`}
          >
            <span className="truncate">{tab.title}</span>
            <button
              onClick={(e) => closeTab(tab.id, e)}
              className={`p-0.5 rounded-sm hover:bg-white/20 transition-colors ${
                tabs.length > 1 ? "opacity-0 group-hover:opacity-100" : "hidden"
              }`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={createNewTab}
        className="text-gray-400 hover:text-white p-1 ml-4 rounded-md hover:bg-white/10 transition-colors  right-2"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
