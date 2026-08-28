import ApplicationsPopover from "@/components/ApplicationsPopover/ApplicationsPopover";
import Mail from "@/components/Mail/Mail";
import Maps from "@/components/Maps/Maps";
import Notes from "@/components/Notes/Notes";
import Safari from "@/components/Safari/Safari";
import Settings from "@/components/Settings/Settings";
import Terminal from "@/components/Terminal/Terminal";
import VisualCode from "@/components/VisualCode/VisualCode";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";
import { useSystem } from "@/composable/useSystem";

export default function Home({ currentWindow }: any) {
  const { wallpaper } = useSystem();
  return (
    <div
      className="w-screen h-screen overflow-hidden bg-center bg-cover transition-all duration-500"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {currentWindow === CURRENT_WINDOW_TYPE.HOME && (
        <div className="mt-10 mx-2 flex flex-col h-full">
          <VisualCode />
          <Safari />
          <ApplicationsPopover />
          <Terminal />
          <Maps />
          <Notes />
          <Mail />
          <Settings />
        </div>
      )}
    </div>
  );
}
