import { BundledProductsDetailsScreen } from "./BundledProductsDetailsScreen";
import { PRODUCT_TYPES } from "../../../constants/wordpress";
import { Redirect, useLocalSearchParams } from "expo-router";
import { SimpleProductDetailsScreen } from "./SimpleProductDetailsScreen";
import { VariableProductDetailsScreen } from "./VariableProductDetailsScreen";

export function ProductDetailsScreenFactory() {
  const product = useLocalSearchParams();

  if (product?.type === PRODUCT_TYPES.SIMPLE) {
    return <SimpleProductDetailsScreen />;
  }
  if (product?.type === PRODUCT_TYPES.VARIABLE) {
    return <VariableProductDetailsScreen />;
  }
  if (product?.type === PRODUCT_TYPES.BUNDLE) {
    return <BundledProductsDetailsScreen />;
  }

  return <Redirect href="../" />;
}
