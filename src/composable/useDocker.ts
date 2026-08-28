import { Store } from "@tanstack/store";
import { useSelector } from "@tanstack/react-store";

const dockerStore = new Store({
  appOpen: [] as string[],
  appMinimized: [] as string[],
  appMaximized: [] as string[],
  activeApp: "" as string,
  isAppsPopoverOpen: false,
});

export const useDocker = () => {
  const appOpen = useSelector(dockerStore, (state) => state.appOpen);
  const appMinimized = useSelector(dockerStore, (state) => state.appMinimized);
  const appMaximized = useSelector(dockerStore, (state) => state.appMaximized);
  const activeApp = useSelector(dockerStore, (state) => state.activeApp);
  const isAppsPopoverOpen = useSelector(
    dockerStore,
    (state) => state.isAppsPopoverOpen,
  );

  const setAppOpen = (apps: string[]) =>
    dockerStore.setState((s) => ({ ...s, appOpen: apps }));
  const setAppMinimized = (apps: string[]) =>
    dockerStore.setState((s) => ({ ...s, appMinimized: apps }));
  const setAppMaximized = (apps: string[]) =>
    dockerStore.setState((s) => ({ ...s, appMaximized: apps }));
  const setActiveApp = (appId: string) =>
    dockerStore.setState((s) => ({ ...s, activeApp: appId }));
  const setIsAppsPopoverOpen = (isOpen: boolean) =>
    dockerStore.setState((s) => ({ ...s, isAppsPopoverOpen: isOpen }));

  return {
    appOpen,
    setAppOpen,
    appMinimized,
    setAppMinimized,
    appMaximized,
    setAppMaximized,
    activeApp,
    setActiveApp,
    isAppsPopoverOpen,
    setIsAppsPopoverOpen,
  };
};
