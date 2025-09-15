import { Shimmer } from "../../../common";
import { View } from "react-native";

export default function ShippingZoneSkeleton() {
  return (
    <View className="flex flex-row py-5">
      <View className="w-2/12 p-2 my-auto md:pl-5">
        <View className="w-5 h-5 rounded-full flex flex-row justify-center items-center overflow-hidden">
          <Shimmer />
        </View>
      </View>

      <View className="w-10/12 space-y-2">
        <View className="h-5 w-4/5 rounded-sm overflow-hidden">
          <Shimmer />
        </View>

        <View className="h-4 pr-2 rounded-sm overflow-hidden">
          <Shimmer />
        </View>
      </View>
    </View>
  );
}
