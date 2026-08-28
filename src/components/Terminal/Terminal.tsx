import React, { useState } from "react";
import { useDocker } from "@/composable/useDocker";
import type { HistoryLine, TabData } from "@/types/terminal.types";
import WindowWrapper from "../WindowWrapper/WindowWrapper";
import TerminalTabs from "./TerminalTabs";
import TerminalBody from "./TerminalBody";

const getDefaultHistory = (): HistoryLine[] => [
  {
    id: `init-${Date.now()}`,
    type: "output",
    content: `Last login: ${new Date().toString().slice(0, 24)} on ttys000`,
  },
];

export default function Terminal() {
  const { appOpen, setAppOpen } = useDocker();

  const [tabs, setTabs] = useState<TabData[]>([
    { id: "tab-1", title: "~", history: getDefaultHistory(), currentInput: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const createNewTab = () => {
    const newTabId = `tab-${Date.now()}`;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        title: "~",
        history: getDefaultHistory(),
        currentInput: "",
      },
    ]);
    setActiveTabId(newTabId);
  };

  const closeTab = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (tabs.length === 1) {
      setAppOpen(appOpen.filter((app) => app !== "terminal"));
      return;
    }

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const updateActiveTabState = (updates: Partial<TabData>) => {
    setTabs(tabs.map((t) => (t.id === activeTabId ? { ...t, ...updates } : t)));
  };

  return (
    <WindowWrapper
      appId="terminal"
      title="sibghatkhan — sibghatkhan@sibghats-MacBook-Air — -zsh — 80x24"
      defaultWidth={750}
      defaultHeight={500}
    >
      <div className="flex flex-col w-full h-full bg-[#1c1c1e]/95 backdrop-blur-xl text-[#f1f1f1] font-mono text-[13px] overflow-hidden">
        <TerminalTabs
          tabs={tabs}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          createNewTab={createNewTab}
          closeTab={closeTab}
        />
        <TerminalBody
          activeTab={activeTab}
          updateActiveTabState={updateActiveTabState}
          closeTab={closeTab}
        />
      </div>
    </WindowWrapper>
  );
}
