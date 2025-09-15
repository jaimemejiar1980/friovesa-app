import { Image } from "expo-image";
import { leftArrowIcon } from "../../../../constants/icons";

export function GoBackIcon() {
  return (
    <Image
      source={leftArrowIcon}
      style={{
        width: 30,
        height: 30,
        tintColor: "#fff",
      }}
    />
  );
}
