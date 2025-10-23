import { AppAvailabilityNotificationContext } from "../context";
import { NotificationService } from "../services";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

export function AppAvailabilityNotificationProvider({ children }) {
  const isIos = Platform.OS === "ios";

  const notificationService = new NotificationService();

  const [isLoading, setIsLoading] = useState(true);
  const [isAppAvailable, setIsAppAvailable] = useState(true);
  const [appAvailabilityInfo, setAppAvailabilityInfo] = useState(null);

  useEffect(() => {
    const setupInfo = async () => {
      try {
        setIsLoading(true);

        let info = null;
        
        if (isIos) {
          info = await notificationService.getIosAppAvailability();
        } else {
          info = await notificationService.getAndroidAppAvailability();
        }
        

        setAppAvailabilityInfo(info);

        if (!info || !info.enabled) {
          setIsLoading(false);
          setIsAppAvailable(true);
          return;
        }

        setIsAppAvailable(info.available);
      } catch (error) {
        console.log("🚀 ~ setupInfo ~ error:", error);
        setIsAppAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    setupInfo();
  }, []);

  return (
    <AppAvailabilityNotificationContext.Provider
      value={{
        isLoading,
        isAppAvailable,
        appAvailabilityInfo,
      }}
    >
      {children}
    </AppAvailabilityNotificationContext.Provider>
  );
}
