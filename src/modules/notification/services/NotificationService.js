import { api } from "../../../axios";
import { API } from "../../../constants/wordpress";
import { AppAvailabilityDto } from "../dto/AppAvailabilityDto";
import { AppVersionNotificationDTO } from "../dto";

export class NotificationService {
  async getAndroidAppVersion() {
    const response = await api.get(API.NOTIFICATION.APP_VERSION_ANDROID.URL);
    const appVersion = new AppVersionNotificationDTO(response.data);
    return appVersion;
  }

  async getIosAppVersion() {
    const response = await api.get(API.NOTIFICATION.APP_VERSION_IOS.URL);
    const appVersion = new AppVersionNotificationDTO(response.data);
    return appVersion;
  }

  async getAndroidAppAvailability() {
    const response = await api.get(
      API.NOTIFICATION.APP_AVAILABILITY_ANDROID.URL
    );
    const appAvailability = new AppAvailabilityDto(response.data);
    return appAvailability;
  }

  async getIosAppAvailability() {
    const response = await api.get(API.NOTIFICATION.APP_AVAILABILITY_IOS.URL);
    const appAvailability = new AppAvailabilityDto(response.data);
    return appAvailability;
  }
}
