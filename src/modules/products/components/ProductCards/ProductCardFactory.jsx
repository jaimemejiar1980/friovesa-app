import { PRODUCT_TYPES } from "../../../../constants/wordpress";
import { ProductDTO } from "../../dto";
import { router, usePathname } from "expo-router";
import { SimpleProductCard } from "./SimpleProductCard";
import { useCallback } from "react";
import { VariableProductCard } from "./VariableProductCard";

/**
 * @param {Object} params - The function parameter object.
 * @param {ProductDTO} params.product - The product object containing details.
 *
 * @returns {JSX.Element|null} The appropriate product card component, or null if price is zero.
 */
export function ProductCardFactory({ product }) {
  const pathName = usePathname();

  const handlePress = useCallback(() => {
    const city = pathName.split("/")[1];
    const relatedIds = product?.relatedIds?.join(",");

    const routerParams = new URLSearchParams({
      productId: product?.id,
      formattedPrice: product?.formattedPrice,
      name: product?.name,
      imageUrl: product?.imageUrl,
      relatedIds,
      type: product?.type, // to handle which type of product details screen should be rendered.
    });

    router.push(`/${city}/product/${product?.id}?${routerParams}`);
  }, [pathName, product]);

  if (product.type == PRODUCT_TYPES.BUNDLE) {
    return (
      <VariableProductCard
        handlePress={handlePress}
        imageUrl={product?.imageUrl}
        name={product?.name}
        priceHtml={product?.priceHtml}
        showCardControl={product?.inStock}
      />
    );
  }

  if (product?.price == 0) return null;

  if (product.type == PRODUCT_TYPES.SIMPLE) {
    return (
      <SimpleProductCard
        handlePress={handlePress}
        imageUrl={product?.imageUrl}
        name={product?.name}
        price={product?.formattedPrice}
        showCardControl={product?.inStock}
        maxQuantity={product?.stockQuantity}
        product={product}
      />
    );
  }

  if (product.type == PRODUCT_TYPES.VARIABLE) {
    return (
      <VariableProductCard
        handlePress={handlePress}
        imageUrl={product?.imageUrl}
        name={product?.name}
        priceHtml={product?.priceHtml}
        showCardControl={product?.inStock}
      />
    );
  }

  return null;
}
