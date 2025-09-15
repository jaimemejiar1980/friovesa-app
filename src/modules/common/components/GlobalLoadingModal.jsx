import { ActivityIndicator } from "react-native";
import { APP_COLORS } from "../../../constants/colors";
import CustomModal from "./CustomModal";
import ShadowView from "./ShadowView";

export function GlobalLoadingModal({ isOpen }) {
  return (
    <CustomModal isOpen={isOpen}>
      <ShadowView extraStyles="p-2 bg-white rounded-full">
        <ActivityIndicator size="large" color={APP_COLORS.secondary} />
      </ShadowView>
    </CustomModal>
  );
}
