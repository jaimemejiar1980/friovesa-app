import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function TabBarIconLabel({ icon, title, color }) {
  return (
    <View>
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: color }}
      />
      <Text
        style={{
          color: color,
          textAlign: "center",
          fontSize: 12,
        }}
        className="uppercase"
      >
        {title}
      </Text>
    </View>
  );
}
