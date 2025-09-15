import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

export class SecureStore {
  static async save(key, value) {
    try {
      await setItemAsync(key, value);
    } catch (error) {
      console.log("Error while saving to SecureStore", error);
    }
  }

  static async getValueByKey(key) {
    try {
      const result = await getItemAsync(key);
      return result;
    } catch (error) {
      return null;
    }
  }

  static async delete(key) {
    try {
      await deleteItemAsync(key);
    } catch (error) {
      console.log("Error while deleting from SecureStore", error);
    }
  }
}
