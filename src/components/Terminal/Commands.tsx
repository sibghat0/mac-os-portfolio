import type { CommandContext, TerminalCommand } from "@/types/terminal.types";
import React from "react";

const createAppCommand = (
  command: string,
  appName: string,
): TerminalCommand => ({
  command,
  description: `Open ${appName}`,
  execute: ({ appOpen, setAppOpen }: CommandContext): React.ReactNode => {
    if (!appOpen.includes(command)) setAppOpen([...appOpen, command]);
    return `Opening ${appName}...`;
  },
});

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    command: "help",
    description: "Show this message",
    execute: (): React.ReactNode => (
      <div className="text-gray-300">
        <p>Available commands:</p>
        <ul className="pl-4 mt-1 space-y-0.5">
          {TERMINAL_COMMANDS.map((cmd: TerminalCommand) => (
            <li key={cmd.command}>
              <span className="text-green-400 font-medium inline-block w-28">
                {cmd.command}
              </span>
              - {cmd.description}
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  createAppCommand("safari", "Safari"),
  createAppCommand("finder", "Finder"),
  createAppCommand("maps", "Maps"),
  createAppCommand("email", "Mail"),
  createAppCommand("settings", "System Settings"),
  createAppCommand("notes", "Notes"),

  {
    command: "code .",
    description: "Open Visual Studio Code (Alias)",
    execute: ({ appOpen, setAppOpen }: CommandContext): React.ReactNode => {
      if (!appOpen.includes("vscode")) setAppOpen([...appOpen, "vscode"]);
      return "Opening Visual Studio Code...";
    },
  },
  {
    command: "pwd",
    description: "Print working directory",
    execute: (): React.ReactNode => "/Users/sibghatkhan/Desktop",
  },
  {
    command: "ls",
    description: "List directory contents",
    execute: (): React.ReactNode => (
      <div className="flex gap-6 text-cyan-400 font-medium">
        <span>Applications</span>
        <span>Desktop</span>
        <span>Documents</span>
        <span>Downloads</span>
        <span>Projects</span>
      </div>
    ),
  },
  {
    command: "whoami",
    description: "Display current user",
    execute: (): React.ReactNode => "sibghatkhan",
  },
  {
    command: "date",
    description: "Display current date and time",
    execute: (): React.ReactNode => new Date().toString(),
  },
  {
    command: "echo",
    description: "Print text to the terminal",
    execute: ({ args }: CommandContext): React.ReactNode => args.join(" "),
  },
  {
    command: "my details",
    description: "View developer profile",
    execute: (): React.ReactNode => (
      <div className="text-gray-300 space-y-1">
        <p className="text-cyan-400 font-bold text-sm">Sibghatullah Khan</p>
        <p>---------------------------------</p>
        <p>
          <span className="text-yellow-400">Role:</span> Software Engineer (4
          Years Experience)
        </p>
        <p>
          <span className="text-yellow-400">Current:</span> Software Engineer @
          Digantara
        </p>
        <p>
          <span className="text-yellow-400">Education:</span> B.Tech IT, RCC
          Institute of Information Technology
        </p>
        <p>
          <span className="text-yellow-400">Location:</span> India
        </p>
        <p>
          <span className="text-yellow-400">Email:</span>{" "}
          ssibghatkkhan81@gmail.com
        </p>
        <p>
          <span className="text-yellow-400">Links:</span> github.com/sibghato |
          linkedin.com/sibghatullah
        </p>
      </div>
    ),
  },
  {
    command: "skills",
    description: "List technical skills and tools",
    execute: (): React.ReactNode => (
      <div className="text-gray-300 space-y-2">
        <p>
          <span className="text-purple-400 font-bold">Languages:</span>{" "}
          JavaScript, TypeScript, Node.js, C++
        </p>
        <p>
          <span className="text-blue-400 font-bold">Frontend:</span> React, Vue,
          Redux, Tailwind, Astro, Bootstrap
        </p>
        <p>
          <span className="text-green-400 font-bold">Backend & DB:</span>{" "}
          Node.js, REST APIs, Express, NestJS, MongoDB, PostgreSQL, Firebase
        </p>
        <p>
          <span className="text-cyan-400 font-bold">Desktop:</span> Electron
        </p>
        <p>
          <span className="text-yellow-400 font-bold">Tools:</span> Git, Jira,
          Figma, Storybook
        </p>
      </div>
    ),
  },
  {
    command: "projects",
    description: "View recent project highlights",
    execute: (): React.ReactNode => (
      <div className="text-gray-300 space-y-3">
        <div>
          <p className="text-cyan-400 font-bold">Aniwatch API Instance</p>
          <p className="text-sm">
            Local development deployment using Node.js and Redis, handling port
            bindings and database connectivity.
          </p>
        </div>
        <div>
          <p className="text-cyan-400 font-bold">Cross-Platform Desktop Apps</p>
          <p className="text-sm">
            Built using Electron within a pnpm monorepo workspace, targeting
            Linux environments.
          </p>
        </div>
        <div>
          <p className="text-cyan-400 font-bold">
            Client Proposals & Architectures
          </p>
          <p className="text-sm">
            Structured web development scopes and React Native build pipeline
            evaluations for senior engineering candidates.
          </p>
        </div>
      </div>
    ),
  },
  {
    command: "neofetch",
    description: "Display system information",
    execute: (): React.ReactNode => (
      <div className="flex gap-4 text-gray-300 font-mono">
        <div className="text-cyan-500 font-bold whitespace-pre">
          {`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`}
        </div>
        <div className="space-y-1">
          <p>
            <span className="text-cyan-400 font-bold">sibghatkhan</span>@
            <span className="text-cyan-400 font-bold">macbook-air</span>
          </p>
          <p>-------------------------</p>
          <p>
            <span className="text-yellow-400 font-bold">OS:</span> macOS
            Monterey 12.4
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Host:</span> Web Browser
            (React)
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Kernel:</span> 21.5.0
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Uptime:</span> Just
            booted
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Shell:</span> zsh 5.8.1
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Editor:</span> Neovim
          </p>
        </div>
      </div>
    ),
  },
  {
    command: "clear",
    description: "Clear terminal output",
    execute: ({ clearTerminal }: CommandContext): void => {
      clearTerminal();
    },
  },
  {
    command: "exit",
    description: "Close current tab/session",
    execute: ({ exitTerminal }: CommandContext): void => {
      exitTerminal();
    },
  },
];
