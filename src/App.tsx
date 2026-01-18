import Home from "./pages/Home";
import LockScreen from "./pages/LockScreen";
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CURRENT_WINDOW_TYPE } from "./types/home.type";

function App() {
  const [currentWindow, setCurrentWindow] = useState(
    CURRENT_WINDOW_TYPE.LOCKSCREEN,
  );
  const isLockScreen = currentWindow === CURRENT_WINDOW_TYPE.LOCKSCREEN;

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <Header />
      <main>
        {currentWindow === CURRENT_WINDOW_TYPE.LOCKSCREEN ? (
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
