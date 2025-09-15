import { Card } from "../../../common";
import { Pressable } from "react-native";

export function ProductCardContainer({ children, handlePress }) {
  return (
    <Card additionalStyles="h-48 md:h-60">
      <Pressable className="h-full w-full" onPress={handlePress}>
        {children}
      </Pressable>
    </Card>
  );
}
