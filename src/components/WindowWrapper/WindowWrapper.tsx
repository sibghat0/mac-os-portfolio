import React from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useDocker } from "@/composable/useDocker";

interface WindowWrapperProps {
  appId: string;
  title?: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function WindowWrapper({
  appId,
  title = "Application",
  children,
  defaultWidth = 800,
  defaultHeight = 500,
}: WindowWrapperProps) {
  const {
    appOpen,
    setAppOpen,
    appMinimized,
    setAppMinimized,
    appMaximized,
    setAppMaximized,
    activeApp,
    setActiveApp,
  } = useDocker();

  const dragControls = useDragControls();

  const isOpen = appOpen.includes(appId);
  const isMinimized = appMinimized.includes(appId);
  const isMaximized = appMaximized.includes(appId);
  const isActive = activeApp === appId;

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAppOpen(appOpen.filter((id) => id !== appId));
    setAppMinimized(appMinimized.filter((id) => id !== appId));
    setAppMaximized(appMaximized.filter((id) => id !== appId));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAppMinimized([...appMinimized, appId]);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) {
      setAppMaximized(appMaximized.filter((id) => id !== appId));
    } else {
      setAppMaximized([...appMaximized, appId]);
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          drag={!isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onMouseDown={() => setActiveApp(appId)}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: isMaximized ? 0 : undefined,
            x: isMaximized ? 0 : undefined,
            width: isMaximized ? "100vw" : defaultWidth,
            height: isMaximized ? "100vh" : defaultHeight,
            top: isMaximized ? 0 : "10vh",
            left: isMaximized ? 0 : "15vw",
            borderRadius: isMaximized ? "0px" : "12px",
          }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`absolute flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-[#1c1c1e] ${
            isActive
              ? "z-30 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              : "z-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          }`}
        >
          <div
            className="flex items-center h-12 px-4 bg-[#2d2d2d] border-b border-black/30 select-none cursor-default"
            onDoubleClick={handleMaximize}
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className="flex gap-2 w-16 group">
              <button
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center relative overflow-hidden"
              >
                <span className="absolute opacity-0 group-hover:opacity-100 text-black/70 text-[8px] font-bold">
                  ✕
                </span>
              </button>
              <button
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center relative overflow-hidden"
              >
                <span className="absolute opacity-0 group-hover:opacity-100 text-black/70 text-[10px] font-bold -translate-y-[1px]">
                  −
                </span>
              </button>
              <button
                onClick={handleMaximize}
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center relative overflow-hidden"
              >
                <span className="absolute opacity-0 group-hover:opacity-100 text-black/70 text-[8px] font-bold">
                  ＋
                </span>
              </button>
            </div>

            <div className="flex-1 text-center text-[13px] text-gray-300 font-medium tracking-wide truncate mr-16">
              {title}
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative bg-white/5 cursor-default">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
