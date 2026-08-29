import Home from "@/pages/Home";
import LockScreen from "@/pages/LockScreen";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CURRENT_WINDOW_TYPE } from "@/types/home.type";
import { useBattery } from "@/utils/useBattery";
import { useWindow } from "@/composable/useWindow";
import ShutdownScreen from "@/pages/ShutDownScreen";
import SleepScreen from "@/pages/SleepScreen";

function App() {
  const { currentWindow, setCurrentWindow, isInitialBoot, setIsInitialBoot } =
    useWindow();

  useBattery();

  if (currentWindow === CURRENT_WINDOW_TYPE.SHUTDOWN) {
    return (
      <ShutdownScreen
        isInitialBoot={isInitialBoot}
        onBoot={() => {
          setCurrentWindow(CURRENT_WINDOW_TYPE.LOCKSCREEN);
          setIsInitialBoot(false);
        }}
      />
    );
  }

  if (currentWindow === CURRENT_WINDOW_TYPE.SLEEP) {
    return (
      <SleepScreen
        onWakeUp={() => setCurrentWindow(CURRENT_WINDOW_TYPE.LOCKSCREEN)}
      />
    );
  }

  const isLockScreen = currentWindow === CURRENT_WINDOW_TYPE.LOCKSCREEN;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <main className="flex-1">
        {isLockScreen ? (
          <LockScreen
            currentWindow={currentWindow}
            setCurrentWindow={setCurrentWindow}
          />
        ) : (
          <Home
            currentWindow={currentWindow}
            setCurrentWindow={setCurrentWindow}
          />
        )}
      </main>
      {!isLockScreen && <Footer />}
    </div>
  );
}

export default App;
