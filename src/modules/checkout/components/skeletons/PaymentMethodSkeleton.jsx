import { ShadowView, Shimmer } from "../../../common";
import { View } from "react-native";

export default function PaymentMethodSkeleton({ showImage = true }) {
  return (
    <ShadowView extraStyles="flex flex-row py-4 pr-4 rounded-md">
      <View className="w-2/12 my-auto md:pl-10">
        <View className="mx-auto w-5 h-5 rounded-full bg-slate-50 overflow-hidden">
          <Shimmer />
        </View>
      </View>

      <View className="w-10/12 space-y-3">
        <View className="w-full h-5 rounded-sm overflow-hidden">
          <Shimmer />
        </View>

        {showImage && (
          <View className="w-full h-16 rounded-sm overflow-hidden">
            <Shimmer />
          </View>
        )}
      </View>
    </ShadowView>
  );
}
