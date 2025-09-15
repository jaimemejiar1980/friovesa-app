import { APP_COLORS } from "../../../constants/colors";
import { errorToast } from "../../../lib/Toast";
import { Image } from "expo-image";
import { memo, useCallback } from "react";
import { minusIcon, plusIcon } from "../../../constants/icons";
import { ShadowView } from "../../common";
import { useActiveProduct } from "../hooks";
import { useCart } from "../../cart";
import { usePathname } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import lang from "../../../lang/es";

function ProductCartControl({ maxQuantity, product }) {
  const { isActive, onActiveControl } = useActiveProduct();
  const { addToCart, decreaseQuantity, productQuantity, cityName } = useCart();
  const initialQuantity = productQuantity(product.id);
  const [quantity, setQuantity] = useState(initialQuantity);
  const pathName = usePathname();

  const pathCityName = pathName.split("/")[1];

  useEffect(() => {
    setQuantity(productQuantity(product.id));
  }, [initialQuantity]);

  const handlePressAddToCart = useCallback(() => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
    addToCart(product, pathCityName);
    onActiveControl(product.id);
  }, [quantity, cityName, pathCityName]);

  const handlePressRemoveFromCart = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    decreaseQuantity(product.id);
  }, [quantity]);

  return (
    <>
      {quantity > 0 ? (
        <ShadowView extraStyles="border bg-gray-100 rounded-xl border-gray-400">
          <Pressable
            className="flex flex-row justify-center"
            onPress={(e) => {
              e.stopPropagation();
              onActiveControl(product.id);
            }}
          >
            {isActive(product.id) && (
              <Pressable onPress={handlePressRemoveFromCart}>
                <View className="w-9 h-9 md:w-11 md:h-11 p-2">
                  <Image
                    source={minusIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    tintColor={APP_COLORS.secondary}
                  />
                </View>
              </Pressable>
            )}

            <View className="px-1 w-9 h-9 md:w-11 md:h-11 flex flex-row items-center">
              <Pressable
                className="w-full"
                onPress={() => onActiveControl(product.id)}
              >
                <Text
                  className="text-sm text-center font-bold md:text-md"
                  numberOfLines={2}
                >
                  {quantity}
                </Text>
              </Pressable>
            </View>

            {isActive(product.id) && (
              <Pressable onPress={handlePressAddToCart}>
                <View className="w-9 h-9 md:w-11 md:h-11 p-2">
                  <Image
                    source={plusIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    tintColor={APP_COLORS.secondary}
                  />
                </View>
              </Pressable>
            )}
          </Pressable>
        </ShadowView>
      ) : (
        <ShadowView extraStyles="bg-secondary rounded-xl border border-secondary">
          <Pressable onPress={handlePressAddToCart}>
            <View className="w-9 h-9 md:w-11 md:h-11 p-2">
              <Image
                source={plusIcon}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                tintColor={APP_COLORS.foreground}
              />
            </View>
          </Pressable>
        </ShadowView>
      )}
    </>
  );
}

export default memo(ProductCartControl);
