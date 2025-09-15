import { API } from "../../../constants/wordpress";
import {
  ControlButtonSuccess,
  CustomSafeAreaView,
  GoBackTabsHeader,
  ListContainer,
} from "../../../modules/common";
import {
  ProductDetailsAccordions,
  ProductDetailsImage,
  ProductDetailsInfoSkeleton,
  ProductDetailsInfoVariation,
  RelatedProductsList,
  useProduct,
  useProductVariations,
  VariationTag,
  VariationTagListSkeleton,
} from "../../../modules/products";
import { ProductVariationDTO } from "../../../modules/products/dto";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { VariationTagSkeleton } from "../../../modules/products/components/skeletons/VariationTagSkeleton";
import { View, Text } from "react-native";
import lang from "../../../lang/es";

export function VariableProductDetailsScreen() {
  const selectedProduct = useLocalSearchParams();
  const { productId, name, imageUrl, relatedIds } = selectedProduct;
  const relatedIdsArray = relatedIds?.split(",");

  const { isLoading, isError, product } = useProduct({ id: productId });

  /**
   * @type {ReturnType<typeof useState<ProductVariationDTO>>} productVariation
   */
  const [productVariation, setProductVariation] = useState(null);

  /**
   * @type {ReturnType<typeof useState<ProductVariationDTO[]>>} sortedProductVariations
   */
  const [sortedProductVariations, setSortedProductVariations] = useState([]);

  const {
    products: productVariations,
    isLoading: isLoadingVariations,
    isError: isErrorVariations,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProductVariations({
    perPage: API.PRODUCTS.VARIATIONS.RESULTS_PER_PAGE,
    productId: productId,
  });

  const handleSelectVariation = (productId) => {
    const selectedVariation = productVariations.find(
      (product) => product.id === productId
    );

    setProductVariation(selectedVariation);
  };

  useEffect(() => {
    if (productVariations?.length > 0) {
      let sortedProducts = [];
      try {
        sortedProducts = [...productVariations].sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } catch (error) {
        console.log(
          "🚀 ~ VariableProductDetailsScreen ~ sorting error:",
          error
        );
        sortedProducts = [...productVariations];
      }
      setSortedProductVariations(sortedProducts);

      const firstProductVariation = sortedProducts[0];
      setProductVariation(firstProductVariation);
    }
  }, [isLoadingVariations, isErrorVariations]);

  return (
    <CustomSafeAreaView>
      <ScrollView className="space-y-5" showsVerticalScrollIndicator={false}>
        <View>
          <GoBackTabsHeader />

          <ProductDetailsImage
            imageUrl={productVariation ? productVariation.imageUrl : imageUrl}
          />
        </View>

        <ListContainer>
          <View className="px-4 space-y-5 pt-4">
            <Text className="text-xl font-bold">{name}</Text>

            {isLoadingVariations && (
              <View>
                <VariationTagListSkeleton />
              </View>
            )}

            {!isLoadingVariations && !isErrorVariations && productVariation && (
              <View className="space-y-3">
                <View className="flex flex-wrap flex-row">
                  {sortedProductVariations?.map((product) => (
                    <View key={product?.id} className="pr-2 pb-2">
                      <VariationTag
                        handlePress={() => handleSelectVariation(product.id)}
                        isActive={productVariation?.id === product.id}
                        title={product?.name}
                      />
                    </View>
                  ))}

                  {isFetchingNextPage && (
                    <>
                      <View className="pr-2 pb-2">
                        <VariationTagSkeleton />
                      </View>

                      <View className="pr-2 pb-2">
                        <VariationTagSkeleton />
                      </View>

                      <View className="pr-2 pb-2">
                        <VariationTagSkeleton />
                      </View>
                    </>
                  )}
                </View>

                {hasNextPage && (
                  <View>
                    <ControlButtonSuccess
                      title={lang?.seeMore}
                      handlePress={() => fetchNextPage()}
                    />
                  </View>
                )}
              </View>
            )}

            {productVariation?.id ? (
              <View>
                <ProductDetailsInfoVariation productId={productVariation?.id} />
              </View>
            ) : (
              <View>
                <ProductDetailsInfoSkeleton />
              </View>
            )}

            <View>
              <ProductDetailsAccordions
                isLoading={isLoading}
                isError={isError}
                product={product}
              />
            </View>

            <View>
              <RelatedProductsList
                productId={productId}
                relatedIds={relatedIdsArray}
              />
            </View>
          </View>
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
