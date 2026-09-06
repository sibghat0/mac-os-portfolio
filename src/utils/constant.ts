import finderIcon from "@/assets/images/docker/Finder.svg";
import appIcon from "@/assets/images/docker/Apps.svg";
import mailIcon from "@/assets/images/docker/Mail.svg";
import mapIcon from "@/assets/images/docker/Maps.svg";
import settingsIcon from "@/assets/images/docker/System.svg";
import trashIcon from "@/assets/images/docker/Empty_Bin.svg";
import safariIcon from "@/assets/images/docker/Safari.svg";
import terminalIcon from "@/assets/images/docker/Terminal.svg";
import codeIcon from "@/assets/images/docker/vs_code.svg";
import NotesIcon from "@/assets/images/docker/Notes.svg";

export interface AppItem {
  id: number;
  name: string;
  icon: string;
  uniqueId: string;
}

export const apps: AppItem[] = [
  { id: 1, uniqueId: "finder", name: "Finder", icon: finderIcon },
  { id: 2, uniqueId: "launchpad", name: "Launchpad", icon: appIcon },
  { id: 3, uniqueId: "maps", name: "Maps", icon: mapIcon },
  { id: 4, uniqueId: "email", name: "Email", icon: mailIcon },
  { id: 5, uniqueId: "terminal", name: "Terminal", icon: terminalIcon },
  { id: 6, uniqueId: "safari", name: "Safari", icon: safariIcon },
  { id: 7, uniqueId: "vscode", name: "VS Code", icon: codeIcon },
  { id: 8, uniqueId: "notes", name: "Notes", icon: NotesIcon },
  { id: 9, uniqueId: "settings", name: "Settings", icon: settingsIcon },
  { id: 10, uniqueId: "trash", name: "Trash", icon: trashIcon },
];
