import React, { useRef, useEffect } from "react";
import { useDocker } from "@/composable/useDocker";
import type {
  CommandContext,
  HistoryLine,
  TabData,
} from "@/types/terminal.types";
import { TERMINAL_COMMANDS } from "./Commands";

const Prompt = () => (
  <div className="flex items-center gap-1.5 mr-2 font-bold select-none">
    <span className="text-[#39ff14]">➜</span>
    <span className="text-cyan-400">~</span>
    <span className="text-red-500">❯</span>
  </div>
);

interface TerminalBodyProps {
  activeTab: TabData;
  updateActiveTabState: (updates: Partial<TabData>) => void;
  closeTab: (id: string) => void;
}

export default function TerminalBody({
  activeTab,
  updateActiveTabState,
  closeTab,
}: TerminalBodyProps) {
  const { appOpen, setAppOpen } = useDocker();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTab.history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const cmdString = activeTab.currentInput.trim();
    if (!cmdString) return;

    const newHistory: HistoryLine[] = [
      ...activeTab.history,
      { id: `${Date.now()}-in`, type: "input", content: cmdString },
    ];

    const commandDefinition = TERMINAL_COMMANDS.find(
      (c) => c.command.toLowerCase() === cmdString.toLowerCase(),
    );

    if (commandDefinition) {
      const context: CommandContext = {
        args: cmdString.split(" ").slice(1),
        appOpen,
        setAppOpen,
        clearTerminal: () => {
          updateActiveTabState({ history: [], currentInput: "" });
        },
        exitTerminal: () => {
          closeTab(activeTab.id);
        },
      };

      const output = commandDefinition.execute(context);
      if (output) {
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          content: output,
        });
      }
    } else {
      newHistory.push({
        id: `${Date.now()}-out`,
        type: "output",
        content: `zsh: command not found: ${cmdString}`,
      });
    }

    // Only update history if the tab wasn't cleared/closed by the command
    if (
      cmdString.toLowerCase() !== "clear" &&
      cmdString.toLowerCase() !== "exit"
    ) {
      updateActiveTabState({ history: newHistory, currentInput: "" });
    }
  };

  return (
    <div
      className="flex-1 p-3 overflow-y-auto cursor-text no-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {activeTab.history.map((line) => (
        <div key={line.id} className="mb-1 leading-relaxed tracking-wide">
          {line.type === "input" ? (
            <div className="flex items-start">
              <Prompt />
              <span>{line.content}</span>
            </div>
          ) : (
            <div className="break-words">{line.content}</div>
          )}
        </div>
      ))}

      <div className="flex items-start">
        <Prompt />
        <input
          ref={inputRef}
          type="text"
          value={activeTab.currentInput}
          onChange={(e) =>
            updateActiveTabState({ currentInput: e.target.value })
          }
          onKeyDown={handleCommand}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none text-[#f1f1f1] font-mono p-0 m-0 caret-gray-400"
        />
      </div>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
