import { Link } from "expo-router";
import { View, Text } from "react-native";
import lang from "../../../lang/es";

export default function NoResults({ infoMessage }) {
  return (
    <View className="flex flex-col items-center">
      <View className="flex flex-col items-center">
        <Text className="text-lg font-bold">{lang.noResults}</Text>

        <Text className="text-center text-base px-6">
          {infoMessage ? infoMessage : lang.noResultsDescription}
        </Text>
      </View>

      <View className="pt-4">
        <Link className="text-secondary text-base py-2 px-4" href="../">
          {lang.goBack}
        </Link>
      </View>
    </View>
  );
}
