import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

import { useDocker } from "@/composable/useDocker";
import { apps, type AppItem } from "@/utils/constant";

const BASE = 56;
const PEAK = 100;
const RANGE = 140;

interface DockItemProps {
  app: AppItem;
  mouseX: MotionValue<number>;
  onImageReady: () => void;
}

function DockItem({ app, mouseX, onImageReady }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    appOpen,
    setAppOpen,
    appMinimized,
    setAppMinimized,
    isAppsPopoverOpen,
    setIsAppsPopoverOpen,
    setActiveApp,
  } = useDocker();
  const [isHovered, setIsHovered] = useState(false);

  const sizeTransform = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    const center = bounds.x + bounds.width / 2;
    const dist = Math.abs(val - center);

    if (dist >= RANGE) return BASE;
    const t = 1 - dist / RANGE;
    const eased = t * t * (3 - 2 * t);
    return BASE + (PEAK - BASE) * eased;
  });

  const size = useSpring(sizeTransform, {
    stiffness: 400,
    damping: 30,
  });

  const handleAppClick = () => {
    if (app.uniqueId === "launchpad") {
      setIsAppsPopoverOpen(!isAppsPopoverOpen);
      return;
    }

    if (isAppsPopoverOpen) {
      setIsAppsPopoverOpen(false);
    }

    setActiveApp(app.uniqueId);

    if (!appOpen.includes(app.uniqueId)) {
      setAppOpen([...appOpen, app.uniqueId]);
    }

    if (appMinimized.includes(app.uniqueId)) {
      setAppMinimized(appMinimized.filter((id) => id !== app.uniqueId));
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-end justify-center origin-bottom"
    >
      {isHovered && (
        <div className="absolute -top-10 z-50 text-white text-xs bg-black/70 px-2 py-1 rounded-md whitespace-nowrap">
          {app.name}
        </div>
      )}

      <div
        className="flex cursor-pointer select-none items-center justify-center w-full h-full"
        onClick={handleAppClick}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="h-full w-full object-contain"
          draggable={false}
          onLoad={onImageReady}
          onError={onImageReady}
        />
      </div>

      {appOpen.includes(app.uniqueId) && (
        <span className="absolute -bottom-1 w-1 h-1 bg-white/85 rounded-full" />
      )}
    </motion.div>
  );
}

export default function Footer() {
  const mouseX = useMotionValue(Infinity);
  const [loadedImages, setLoadedImages] = useState(0);
  const { appMaximized } = useDocker();

  const totalImages = apps.length;
  const isLoaded = loadedImages >= totalImages;
  const isAnyMaximized = appMaximized.length > 0;

  const handleImageReady = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <footer
      className={`fixed left-0 right-0 bottom-4 z-50 flex justify-center px-4 transition-opacity duration-700 ease-in-out ${
        isLoaded && !isAnyMaximized
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 h-20 box-border rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[24px]"
      >
        {apps.map((app) => (
          <DockItem
            key={app.id}
            app={app}
            mouseX={mouseX}
            onImageReady={handleImageReady}
          />
        ))}
      </div>
    </footer>
  );
}
