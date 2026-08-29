import { Store } from "@tanstack/store";
import { useSelector } from "@tanstack/react-store";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";

export const windowStore = new Store<{
  currentWindow: CURRENT_WINDOW_TYPE;
  isInitialBoot: boolean;
}>({
  currentWindow: CURRENT_WINDOW_TYPE.SHUTDOWN,
  isInitialBoot: true,
});

export function useWindow() {
  const currentWindow = useSelector(
    windowStore,
    (state) => state.currentWindow,
  );
  const isInitialBoot = useSelector(
    windowStore,
    (state) => state.isInitialBoot,
  );

  const setCurrentWindow = (windowType: CURRENT_WINDOW_TYPE) => {
    windowStore.setState((s) => ({ ...s, currentWindow: windowType }));
  };

  const setIsInitialBoot = (val: boolean) =>
    windowStore.setState((s) => ({ ...s, isInitialBoot: val }));

  return { currentWindow, setCurrentWindow, isInitialBoot, setIsInitialBoot };
}
