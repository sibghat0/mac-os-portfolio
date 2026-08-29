import ApplicationsPopover from "@/components/ApplicationsPopover/ApplicationsPopover";
import Mail from "@/components/Mail/Mail";
import Maps from "@/components/Maps/Maps";
import Notes from "@/components/Notes/Notes";
import Safari from "@/components/Safari/Safari";
import Settings from "@/components/Settings/Settings";
import Terminal from "@/components/Terminal/Terminal";
import VisualCode from "@/components/VisualCode/VisualCode";
import Resume from "@/components/Resume/Resume";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";
import { useSystem } from "@/composable/useSystem";
import { useDocker } from "@/composable/useDocker";
import aboutIcon from "@/assets/images/Adobe.svg";

export default function Home({ currentWindow }: any) {
  const { wallpaper } = useSystem();
  const { appOpen, setAppOpen, setActiveApp } = useDocker();

  const handleOpenResume = () => {
    if (!appOpen.includes("resume")) {
      setAppOpen([...appOpen, "resume"]);
    }
    setActiveApp("resume");
  };

  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-center bg-cover transition-all duration-500"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {currentWindow === CURRENT_WINDOW_TYPE.HOME && (
        <>
          {/* Main App Windows - Added *:pointer-events-auto here */}
          <div className="mt-10 mx-2 flex flex-col h-full relative z-10 pointer-events-none *:pointer-events-auto">
            <VisualCode />
            <Safari />
            <ApplicationsPopover />
            <Terminal />
            <Maps />
            <Notes />
            <Mail />
            <Settings />
            <Resume />
          </div>

          {/* Desktop Icons - Kept at z-0 so windows can overlap them naturally */}
          <div
            className="absolute top-12 right-6 w-20 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded-md z-0 group"
            onClick={handleOpenResume}
          >
            <img
              src={aboutIcon}
              alt="Resume"
              className="w-14 h-14 drop-shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="text-white text-xs font-medium text-center drop-shadow-md bg-black/30 px-1.5 rounded-sm line-clamp-2">
              Resume.pdf
            </span>
          </div>
        </>
      )}
    </div>
  );
}
