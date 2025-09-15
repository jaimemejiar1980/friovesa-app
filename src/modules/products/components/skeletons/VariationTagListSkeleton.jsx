import { VariationTagSkeleton } from "./VariationTagSkeleton";
import { View } from "react-native";

export function VariationTagListSkeleton({ itemsLength = 4 }) {
  const skeletons = Array.from({ length: itemsLength }, (_, i) => ({
    id: i,
  }));

  return (
    <View className="flex flex-wrap flex-row space-x-3">
      {skeletons.map((skeleton) => (
        <View key={skeleton.id}>
          <VariationTagSkeleton />
        </View>
      ))}
    </View>
  );
}
