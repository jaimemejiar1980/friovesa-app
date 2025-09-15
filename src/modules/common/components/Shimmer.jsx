import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

<ShimmerPlaceholder />;
export default function Shimmer() {
  return (
    <ShimmerPlaceholder
      className="h-full w-full"
      shimmerColors={["#ebebeb", "#d9d9d9", "#ebebeb"]}
    />
  );
}
