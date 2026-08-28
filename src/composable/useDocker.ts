import { Store } from "@tanstack/store";
import { useSelector } from "@tanstack/react-store";

const dockerStore = new Store({
  appOpen: [] as string[],
  appMinimized: [] as string[],
  appMaximized: [] as string[],
  isAppsPopoverOpen: false,
  activeApp: "" as string,
});

export const useDocker = () => {
  const appOpen = useSelector(dockerStore, (state) => state.appOpen);
  const appMinimized = useSelector(dockerStore, (state) => state.appMinimized);
  const appMaximized = useSelector(dockerStore, (state) => state.appMaximized);
  const isAppsPopoverOpen = useSelector(
    dockerStore,
    (state) => state.isAppsPopoverOpen,
  );
  const activeApp = useSelector(dockerStore, (state) => state.activeApp);

  const setAppOpen = (newApps: string[]) => {
    dockerStore.setState((state) => ({ ...state, appOpen: newApps }));
  };

  const setAppMinimized = (newMinimized: string[]) => {
    dockerStore.setState((state) => ({ ...state, appMinimized: newMinimized }));
  };

  const setAppMaximized = (newMaximized: string[]) => {
    dockerStore.setState((state) => ({ ...state, appMaximized: newMaximized }));
  };

  const setIsAppsPopoverOpen = (isOpen: boolean) => {
    dockerStore.setState((state) => ({ ...state, isAppsPopoverOpen: isOpen }));
  };

  const setActiveApp = (appId: string) => {
    dockerStore.setState((state) => ({ ...state, activeApp: appId }));
  };

  return {
    appOpen,
    setAppOpen,
    appMinimized,
    setAppMinimized,
    appMaximized,
    setAppMaximized,
    isAppsPopoverOpen,
    setIsAppsPopoverOpen,
    activeApp,
    setActiveApp,
  };
};
