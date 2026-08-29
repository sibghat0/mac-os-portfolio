"use client";

import { useEffect, useState } from "react";
import { AppleLogoIcon } from "../utils/Icons";

interface ShutdownScreenProps {
  onBoot: () => void;
  isInitialBoot: boolean;
}

type BootStage = "SHUTDOWN_MSG" | "WAITING_TO_BOOT" | "BOOTING";

export default function ShutdownScreen({
  onBoot,
  isInitialBoot,
}: ShutdownScreenProps) {
  const [stage, setStage] = useState<BootStage>(
    isInitialBoot ? "WAITING_TO_BOOT" : "SHUTDOWN_MSG",
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === "SHUTDOWN_MSG") {
      const timer = setTimeout(() => {
        setStage("WAITING_TO_BOOT");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "BOOTING") {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(onBoot, 400);
        }
        setProgress(currentProgress);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [stage, onBoot]);

  const handleClick = () => {
    if (stage === "WAITING_TO_BOOT") {
      setStage("BOOTING");
    }
  };

  return (
    <div
      className={`h-screen w-screen bg-black flex flex-col items-center justify-center ${stage === "WAITING_TO_BOOT" ? "cursor-pointer" : "cursor-default"}`}
      onClick={handleClick}
    >
      {stage === "SHUTDOWN_MSG" && (
        <div className="flex flex-col items-center">
          <p className="text-white text-lg mb-4">
            Your computer has been shut down
          </p>
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div>
        </div>
      )}

      {stage === "WAITING_TO_BOOT" && (
        <div className="flex flex-col items-center">
          <AppleLogoIcon className="w-20 h-20 text-white mb-8" />
          <p className="text-white text-lg animate-pulse">Click to boot</p>
        </div>
      )}

      {stage === "BOOTING" && (
        <div className="flex flex-col items-center w-64">
          <AppleLogoIcon className="w-20 h-20 text-white mb-16" />

          {/* Boot Progress Bar */}
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
