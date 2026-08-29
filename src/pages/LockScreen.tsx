import backgroundImage from "../assets/images/lockScreen/Late.jpg";
import LockScreenClock from "../components/LockScreenClock/LockScreenClock";
import { CURRENT_WINDOW_TYPE } from "../types/home.type";

export default function LockScreen({ setCurrentWindow }: any) {
  return (
    <div
      onClick={() => setCurrentWindow(CURRENT_WINDOW_TYPE.HOME)}
      className="relative h-screen w-screen overflow-hidden"
    >
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      <div className="relative z-10 flex flex-col items-center h-full pt-16">
        <LockScreenClock />
      </div>

      <div className="absolute bottom-24 flex flex-col items-center justify-center gap-2 z-20 w-full cursor-pointer">
        <div className="bg-white/45 backdrop-blur-sm rounded-full w-12 h-12 flex justify-center">
          <span className="self-center font-bold text-xl text-white">S</span>
        </div>
        <span className="self-center text-md font-bold">Sibghatullah khan</span>
        <span className="self-center text-xs font-bold opacity-75">
          Touch ID or Enter Password
        </span>
      </div>
    </div>
  );
}
