import { SecureStore } from "../../../lib/SecureStore";
import { USER_DATA } from "../../../constants/secureStoreKeys";
import { UserData } from "../dto";

export class UserStoreService {
  /**
   * Save the user data in the device's secure store.
   *
   * @param {UserData} userData - An object containing the user's ID, username, and email.
   *
   * @returns {Promise<void>} Resolves when the user data has been saved.
   */
  static async save(userData) {
    await SecureStore.save(USER_DATA, JSON.stringify(userData));
  }

  /**
   * Retrieve the user data from the device's secure store.
   *
   * @returns {Promise<UserData>} Resolves with a `UserData` instance containing
   * the user's ID, username, and email retrieved from secure storage.
   */
  static async get() {
    const user = await SecureStore.getValueByKey(USER_DATA);
    const parsedUser = JSON.parse(user);
    return new UserData({
      id: parsedUser?.id,
      username: parsedUser?.username,
      email: parsedUser?.email,
    });
  }

  /**
   * Delete the user data from the device's secure store.
   *
   * @returns {Promise<void>} Resolves when the user data has been removed.
   */
  static async delete() {
    console.log("🗑️ DELETING USER STORE SERVICE");
    await SecureStore.delete(USER_DATA);
  }
}
