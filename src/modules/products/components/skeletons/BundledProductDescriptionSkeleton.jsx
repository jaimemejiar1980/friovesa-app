import { View } from "react-native";
import React from "react";
import { Shimmer } from "../../../common";

export function BundledProductDescriptionSkeleton({ height = 100 }) {
  return (
    <View
      style={{
        height,
      }}
      className="space-y-2 py-5"
    >
      <View className="h-3 rounded-md overflow-hidden">
        <Shimmer />
      </View>

      <View className="h-3 rounded-md overflow-hidden">
        <Shimmer />
      </View>

      <View className="h-3 w-2/3 rounded-md overflow-hidden">
        <Shimmer />
      </View>
    </View>
  );
}
