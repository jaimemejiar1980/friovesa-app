import { View } from "react-native";
import ShippingZoneSkeleton from "./ShippingZoneSkeleton";

export default function ShippingZonesListSkeleton() {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i,
  }));

  return (
    <View>
      {items.map((_, index) => (
        <ShippingZoneSkeleton key={index} />
      ))}
    </View>
  );
}
