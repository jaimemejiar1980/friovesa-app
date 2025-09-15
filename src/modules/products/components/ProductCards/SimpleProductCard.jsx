import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "../../../common";
import { InStockLabel } from "../InStockLabel";
import { ProductCardContainer } from "./ProductCardContainer";
import { ProductPriceHtml } from "../ProductPriceHtml";
import { Text, View } from "react-native";
import ProductCartControl from "../ProductCartControl";

export function SimpleProductCard({
  handlePress,
  imageUrl,
  name,
  price,
  showCardControl,
  maxQuantity,
  product,
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

        {showCardControl && (
          <View className="absolute bottom-0 right-0 p-1">
            <ProductCartControl maxQuantity={maxQuantity} product={product} />
          </View>
        )}
      </View>

      <View className="py-1 px-2">
        <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <ProductPriceHtml priceHtml={price} />

        <InStockLabel hasStock={showCardControl} />
      </View>
    </ProductCardContainer>
  );
}
