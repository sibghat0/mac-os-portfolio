import ApplicationsPopover from "@/components/ApplicationsPopover/ApplicationsPopover";
import Safari from "@/components/Safari/Safari";
import Terminal from "@/components/Terminal/Terminal";
import VisualCode from "@/components/VisualCode/VisualCode";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";

export default function Home({ currentWindow }: any) {
  return (
    <>
      {currentWindow === CURRENT_WINDOW_TYPE.HOME && (
        <div className="mt-10 mx-2 flex flex-col h-full">
          <VisualCode />
          <Safari />
          <ApplicationsPopover />
          <Terminal />
        </div>
      )}
    </>
  );
}
