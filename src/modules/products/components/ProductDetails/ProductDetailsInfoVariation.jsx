import { ProductDetailsInfo } from "./ProductDetailsInfo";
import { useProduct } from "../../hooks";

export function ProductDetailsInfoVariation({ productId }) {
  const { isLoading, isError, product } = useProduct({ id: productId });

  return (
    <ProductDetailsInfo
      isLoading={isLoading}
      isError={isError}
      product={product}
    />
  );
}
