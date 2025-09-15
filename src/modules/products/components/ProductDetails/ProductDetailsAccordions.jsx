import { Shimmer } from "../../../common";
import { ProductCategoriesAccordion } from "./ProductCategoriesAccordion";
import { ProductDescriptionAccordion } from "./ProductDescriptionAccordion";
import { View } from "react-native";

export function ProductDetailsAccordions({ isLoading, isError, product }) {
  if (isLoading) {
    return (
      <View className="space-y-2">
        <View className="h-12 rounded-lg overflow-hidden">
          <Shimmer />
        </View>

        <View className="h-12 rounded-lg overflow-hidden">
          <Shimmer />
        </View>
      </View>
    );
  }

  if (isError) return <></>;

  return (
    <View className="space-y-2">
      <View>
        {product?.description?.trim() !== "" && (
          <ProductDescriptionAccordion htmlDescription={product?.description} />
        )}
      </View>

      <View>
        <ProductCategoriesAccordion categories={product?.categories} />
      </View>
    </View>
  );
}
