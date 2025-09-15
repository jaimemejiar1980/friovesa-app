import { APP_COLORS } from "../../../constants/colors";
import { Card, ImageUrlErrorBoundary } from "../../common";
import { clockIcon, dateIcon } from "../../../constants/icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import lang from "../../../lang/es";
import useOderHistory from "../hooks/useOrderHistory";

export default function OrderCard({ order }) {
  const { onSelectOrderHistory } = useOderHistory();

  const { address, country, id, status, dateCreated, total, totalTax } = order;
  const date = new Date(dateCreated).toLocaleDateString("es-ec");
  const time = new Date(dateCreated).toLocaleTimeString("es-ec", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const firstProductName = order?.products[0]?.name;
  const imageUrl = order?.products[0]?.imageUrl || "#";
  const totalProducts = order?.products.length;

  const handleSelectOrder = () => {
    onSelectOrderHistory(order);
    router.push(`/(drawer)/(tabs)/Settings/orderHistory/${id}`);
  };

  return (
    <Card>
      <TouchableOpacity className="p-3" onPress={handleSelectOrder}>
        <View className="space-y-2">
          <View className="flex flex-row">
            <View className="w-3/12 h-20 md:h-28">
              <ImageUrlErrorBoundary
                imageUrl={imageUrl}
                fallback={<View className="w-full h-full bg-gray-200" />}
              >
                <Image
                  source={{ uri: imageUrl }}
                  className="h-full w-full object-cover"
                />
              </ImageUrlErrorBoundary>
            </View>

            <View className="w-9/12 flex flex-col space-y-5 pl-4">
              <View>
                <Text className="text-base font-bold text-primary">
                  {firstProductName}
                </Text>

                <Text>
                  {address} | {country}
                </Text>
              </View>

              <View className="flex flex-row">
                <View className="w-5/12 pt-1">
                  <View className="flex flex-row items-center">
                    <View className="w-4 h-4">
                      <Image
                        source={dateIcon}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        tintColor={APP_COLORS.copyDarkLighter}
                      />
                    </View>

                    <View className="pl-1">
                      <Text className="capitalize">{date}</Text>
                    </View>
                  </View>

                  <View className="flex flex-row items-center">
                    <View className="w-4 h-4">
                      <Image
                        source={clockIcon}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        tintColor={APP_COLORS.copyDarkLighter}
                      />
                    </View>

                    <View className="pl-1">
                      <Text className="capitalize">{time}</Text>
                    </View>
                  </View>
                </View>

                <View className="w-7/12 pl-1 items-end ">
                  <Text className="text-base font-bold text-end"># {id}</Text>

                  <Text className="px-2 rounded-lg bg-primary text-foreground">
                    {status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-gray-100 flex flex-row justify-between p-1 rounded-md">
            <View className="w-4/12 flex flex-col space-y-2">
              <View className="mx-auto">
                <Text className="font-bold">{lang?.total}</Text>
              </View>

              <View className="mx-auto">
                <Text>{total}</Text>
              </View>
            </View>

            <View className="w-4/12 flex flex-col space-y-2">
              <View className="mx-auto">
                <Text className="font-bold">{lang?.tax}</Text>
              </View>

              <View className="mx-auto">
                <Text>{totalTax}</Text>
              </View>
            </View>

            <View className="w-4/12 flex flex-col space-y-2">
              <View className="mx-auto">
                <Text className="font-bold">{lang?.quantity}</Text>
              </View>

              <View className="mx-auto">
                <Text>{totalProducts}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
