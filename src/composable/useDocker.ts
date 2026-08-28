import { Store } from "@tanstack/store";
import { useSelector } from "@tanstack/react-store";

const dockerStore = new Store({
  appOpen: [] as string[],
});

export const useDocker = () => {
  const appOpen = useSelector(dockerStore, (state) => state.appOpen);

  const setAppOpen = (newApps: string[]) => {
    dockerStore.setState(() => ({ appOpen: newApps }));
  };

  return { appOpen, setAppOpen };
};
