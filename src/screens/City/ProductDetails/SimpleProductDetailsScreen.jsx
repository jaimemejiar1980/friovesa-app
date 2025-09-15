import {
  CustomSafeAreaView,
  GoBackTabsHeader,
  ListContainer,
} from "../../../modules/common";
import {
  ProductDetailsAccordions,
  ProductDetailsImage,
  ProductDetailsInfo,
  RelatedProductsList,
  useProduct,
} from "../../../modules/products";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export function SimpleProductDetailsScreen() {
  const selectedProduct = useLocalSearchParams();
  const { productId, formattedPrice, name, imageUrl, relatedIds } =
    selectedProduct;
  const relatedIdsArray = relatedIds.split(",");

  const { isLoading, isError, product } = useProduct({ id: productId });

  return (
    <CustomSafeAreaView>
      <ScrollView className="space-y-5" showsVerticalScrollIndicator={false}>
        <View>
          <GoBackTabsHeader />

          <ProductDetailsImage imageUrl={imageUrl} />
        </View>

        <ListContainer>
          <View className="px-4 space-y-5 pt-4">
            <View className="space-y-3">
              <Text className="text-xl font-bold">{name}</Text>
            </View>

            <View>
              <ProductDetailsInfo
                isLoading={isLoading}
                isError={isError}
                product={product}
              />
            </View>

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
