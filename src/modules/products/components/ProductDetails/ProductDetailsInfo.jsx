import { errorToast } from "../../../../lib/Toast";
import { ProductDetailsInfoSkeleton } from "../skeletons";
import { useCart } from "../../../cart";
import { usePathname } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import lang from "../../../../lang/es";
import ProductsQuantityPicker from "../ProductsQuantityPicker";

export function ProductDetailsInfo({ isLoading, isError, product }) {
  const { addToCart, cityName } = useCart();
  const [quantity, setQuantity] = useState(1);
  const pathName = usePathname();

  const pathCityName = pathName.split("/")[1];

  const handleIncreaseQuantity = (maxQuantity) => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePressAddToCart = () => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    addToCart(product, pathCityName, quantity);
  };

  return (
    <View>
      {isLoading && <ProductDetailsInfoSkeleton />}

      {isError && <Text>{lang.noResults}</Text>}

      {!isLoading && !isError && !product && <Text>{lang.noResults}</Text>}

      {!isLoading && !isError && product && (
        <View className="space-y-5">
          <View>
            <Text className="text-xl">{product?.formattedPrice}</Text>
          </View>

          <View>
            <View className="flex flex-row flex-wrap space-x-2">
              <Text>{lang.sku}:</Text>

              <Text className="text-secondary font-bold">{product.sku}</Text>
            </View>

            <View className="flex flex-row flex-wrap space-x-2">
              <Text>{lang.availability}</Text>

              {product.inStock ? (
                <Text className="text-in-stock font-bold">
                  {lang.inStock}{" "}
                  {product.stockQuantity ? `(${product.stockQuantity})` : null}
                </Text>
              ) : (
                <Text className=" text-out-of-stock">{lang.outOfStock}</Text>
              )}
            </View>
          </View>

          <View>
            {product.inStock ? (
              <View className="space-y-3">
                <View className="w-full flex-row">
                  <View className="w-1/2 pr-2">
                    <ProductsQuantityPicker
                      quantity={quantity}
                      minQuantity={1}
                      maxQuantity={product?.stockQuantity}
                      handleIncreaseQuantity={() =>
                        handleIncreaseQuantity(product?.stockQuantity)
                      }
                      handleDecreaseQuantity={handleDecreaseQuantity}
                    />
                  </View>

                  <View className="w-1/2 pl-2">
                    <TouchableOpacity
                      className="bg-secondary h-9 md:h-11 rounded-md"
                      onPress={handlePressAddToCart}
                    >
                      <Text className="text-foreground text-center uppercase my-auto">
                        {lang.addToCart}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="w-full bg-secondary rounded-md py-4">
                <Text className="text-center text-foreground uppercase">
                  {lang.notAvailable}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
