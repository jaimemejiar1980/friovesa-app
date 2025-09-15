import { AppAvailabilityNotificationContext } from "../context";
import { useContext } from "react";

export function useAppAvailabilityNotification() {
  return useContext(AppAvailabilityNotificationContext);
}
