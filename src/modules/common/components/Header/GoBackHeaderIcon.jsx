import { APP_COLORS } from "../../../../constants/colors";
import { Image } from "expo-image";
import { leftArrowIcon } from "../../../../constants/icons";

export function GoBackHeaderIcon() {
  return (
    <Image
      source={leftArrowIcon}
      style={{
        width: 30,
        height: 30,
        tintColor: APP_COLORS.copyLighter,
      }}
    />
  );
}
