import { AUTH_TOKEN_KEYS } from "../../../constants/secureStoreKeys";
import { SecureStore } from "../../../lib/SecureStore";
import { SessionData } from "../dto";

export class SessionStoreService {
  /**
   * Save the auth tokens in the device's secure store.
   *
   * @param {SessionData} sessionData - An object containing the user's ID, username, and email.
   *
   * @returns {Promise<void>} Resolves when the user data has been saved.
   */
  static async save(sessionData) {
    await Promise.all([
      SecureStore.save(AUTH_TOKEN_KEYS.ACCESS, sessionData.accessToken),
      SecureStore.save(AUTH_TOKEN_KEYS.REFRESH, sessionData.refreshToken),
    ]);
  }

  static async setAccessToken(accessToken) {
    await SecureStore.save(AUTH_TOKEN_KEYS.ACCESS, accessToken);
  }

  static async getAccessToken() {
    const token = await SecureStore.getValueByKey(AUTH_TOKEN_KEYS.ACCESS);
    return token;
  }

  static async getRefreshToken() {
    const token = await SecureStore.getValueByKey(AUTH_TOKEN_KEYS.REFRESH);
    return token;
  }

  /**
   * Retrieve the auth tokens from the device's secure store.
   *
   * @returns {Promise<SessionData>} Resolves with a `SessionData` instance containing
   * the auth's access and refresh tokens retrieved from secure storage.
   */
  static async get() {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getValueByKey(AUTH_TOKEN_KEYS.ACCESS),
      SecureStore.getValueByKey(AUTH_TOKEN_KEYS.REFRESH),
    ]);
    return new SessionData({
      accessToken,
      refreshToken,
    });
  }

  /**
   * Delete the auth tokens from the device's secure store.
   *
   * @returns {Promise<void>} Resolves when the user data has been removed.
   */
  static async delete() {
    console.log("🗑️ DELETING SESSION STORE SERVICE");
    await Promise.all([
      SecureStore.delete(AUTH_TOKEN_KEYS.ACCESS),
      SecureStore.delete(AUTH_TOKEN_KEYS.REFRESH),
    ]);
  }
}
