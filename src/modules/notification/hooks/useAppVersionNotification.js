import { AppVersionNotificationContext } from "../context";
import { useContext } from "react";

export function useAppVersionNotification() {
  return useContext(AppVersionNotificationContext);
}
