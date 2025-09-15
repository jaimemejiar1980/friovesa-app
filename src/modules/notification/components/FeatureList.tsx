import { FeatureItem } from "./FeatureItem";
import { View, Text } from "react-native";
import lang from "@/lang/es";

export function FeatureList({ features }: { features: string[] }) {
  return (
    <View className="space-y-1">
      <Text className="text-base font-bold">{lang?.features}:</Text>

      {features?.map((feature, index) => (
        <FeatureItem key={index} text={feature} />
      ))}
    </View>
  );
}
