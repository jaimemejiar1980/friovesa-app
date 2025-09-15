import { Image } from "expo-image";
import { View } from "react-native";

export default function HeaderIcon({ icon, color }) {
  return (
    <View>
      <Image
        source={icon}
        style={{ width: 25, height: 25, tintColor: color }}
      />
    </View>
  );
}
