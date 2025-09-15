import { UserData } from "./UserData";
import { SessionData } from "./SessionData";

export class AuthResponse {
  constructor({
    access_token,
    refresh_token,
    user_email,
    user_nicename,
    user_display_name,
    store_id,
  }) {
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
    this.email = user_email;
    this.niceName = user_nicename;
    this.displayName = user_display_name;
    this.storeId = store_id;
  }

  getUserData() {
    return new UserData({
      id: this?.storeId,
      username: this.displayName || this.niceName,
      email: this.email,
    });
  }

  getSessionData() {
    return new SessionData({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
  }
}
