import { Text, View } from "react-native";
import { Image } from "expo-image";
import { ImageUrlErrorBoundary, ShadowView } from "../../../common";
import { InStockLabel } from "../InStockLabel";
import { ProductCardContainer } from "./ProductCardContainer";
import { ProductPriceHtml } from "../ProductPriceHtml";
import lang from "../../../../lang/es";

export function VariableProductCard({
  handlePress,
  imageUrl,
  name,
  priceHtml,
  showCardControl,
}) {
  return (
    <ProductCardContainer handlePress={handlePress}>
      <View className="h-28 md:h-36 w-full rounded-t-md overflow-hidden">
        <ImageUrlErrorBoundary
          imageUrl={imageUrl}
          fallback={<View className="w-full h-full bg-gray-200" />}
        >
          <Image
            source={{ uri: imageUrl }}
            className="h-full w-full object-cover"
          />
        </ImageUrlErrorBoundary>

        <View className="absolute bottom-0 right-0 p-1">
          <ShadowView extraStyles="bg-secondary rounded-xl border border-secondary p-2.5 md:py-2 md:px-2.5">
            <Text className="text-white text-center font-bold md:text-lg">
              {lang?.seeOptions}
            </Text>
          </ShadowView>
        </View>
      </View>

      <View className="py-1 px-2">
        <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <ProductPriceHtml priceHtml={priceHtml} />

        <InStockLabel hasStock={showCardControl} />
      </View>
    </ProductCardContainer>
  );
}
