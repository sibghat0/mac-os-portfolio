export const CURRENT_WINDOW_TYPE = {
  LOCKSCREEN: "lockscreen",
  HOME: "home",
  SHUTDOWN: "shutdown",
  SLEEP: "sleep",
} as const;

export type CURRENT_WINDOW_TYPE =
  (typeof CURRENT_WINDOW_TYPE)[keyof typeof CURRENT_WINDOW_TYPE];
