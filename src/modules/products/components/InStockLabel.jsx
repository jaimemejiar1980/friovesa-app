import { View, Text } from "react-native";
import React from "react";
import lang from "../../../lang/es";

export function InStockLabel({ hasStock }) {
  return (
    <View>
      {hasStock ? (
        <Text className="text-xs text-in-stock">{lang.inStock}</Text>
      ) : (
        <Text className="text-xs text-out-of-stock">{lang.outOfStock}</Text>
      )}
    </View>
  );
}
