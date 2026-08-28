import React from "react";

export interface HistoryLine {
  id: string;
  type: "input" | "output";
  content: React.ReactNode;
}

export interface TabData {
  id: string;
  title: string;
  history: HistoryLine[];
  currentInput: string;
}

export interface CommandContext {
  args: string[];
  appOpen: string[];
  setAppOpen: (apps: string[]) => void;
  clearTerminal: () => void;
  exitTerminal: () => void;
}

export interface TerminalCommand {
  command: string;
  description: string;
  execute: (ctx: CommandContext) => React.ReactNode | void;
}
