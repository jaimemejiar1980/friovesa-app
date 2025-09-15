import { BundledProductCartDTO } from "../../dto";
import { BundledProductDetailsInfoSkeleton } from "../skeletons";
import { errorToast } from "../../../../lib/Toast";
import { useCart } from "../../../cart";
import { usePathname } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import lang from "../../../../lang/es";
import ProductsQuantityPicker from "../ProductsQuantityPicker";

export function BundledProductDetailsInfo({
  clearCollection,
  isLoading,
  isError,
  product,
  enabled,
  bundledProducts,
  price,
  formattedPrice,
}) {
  const { addBundledProductToCart, cityName } = useCart();
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

  const handlePressAddToCart = async () => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    const newProduct = new BundledProductCartDTO({
      ...product,
      price,
      formattedPrice,
      bundle: bundledProducts,
    });

    await clearCollection();
    addBundledProductToCart(newProduct, pathCityName, quantity);
    setQuantity(1)
  };

  return (
    <View>
      {isLoading && <BundledProductDetailsInfoSkeleton />}

      {isError && <Text>{lang?.noResults}</Text>}

      {!isLoading && !isError && !product && <Text>{lang?.noResults}</Text>}

      {!isLoading && !isError && product && (
        <View className="space-y-5">
          <View>
            {product.inStock ? (
              <View className="space-y-3">
                <View className="w-full flex-row">
                  <View className="w-1/2 pr-2">
                    <ProductsQuantityPicker
                      enabled={enabled}
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
                      className={`${
                        enabled ? "bg-secondary" : "bg-gray-100"
                      } h-9 md:h-11 rounded-md`}
                      onPress={handlePressAddToCart}
                      disabled={!enabled}
                    >
                      <Text
                        className={`${
                          enabled ? "text-foreground" : "text-gray-600"
                        } text-center uppercase my-auto`}
                      >
                        {lang?.addToCart}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="w-full bg-secondary rounded-md py-4">
                <Text className="text-center text-foreground uppercase">
                  {lang?.notAvailable}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
