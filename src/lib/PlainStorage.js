import AsyncStorage from "@react-native-async-storage/async-storage";

export class PlainStorage {
  static async save(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error while saving to PlainStorage", error);
    }
  }

  static async getValueByKey(key) {
    try {
      const result = await AsyncStorage.getItem(key);
      return result;
    } catch (error) {
      console.log("Error while getting from PlainStorage", error);
      return null;
    }
  }

  static async delete(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error while deleting from PlainStorage", error);
    }
  }
}
