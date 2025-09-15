import { APP_COLORS } from "../../../constants/colors";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: APP_COLORS.secondary,
        borderLeftColor: APP_COLORS.secondary,
        height: 90,
        width: "98%",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: APP_COLORS.foreground,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        color: APP_COLORS.foreground,
      }}
      text1NumberOfLines={4}
      text2NumberOfLines={1}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: APP_COLORS.outOfStock,
        borderLeftColor: APP_COLORS.outOfStock,
        height: 90,
        width: "98%",
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "bold",
        color: APP_COLORS.foreground,
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: "400",
        color: APP_COLORS.foreground,
      }}
      text1NumberOfLines={4}
      text2NumberOfLines={2}
    />
  ),
};

export default function CustomToast() {
  return <Toast config={toastConfig} />;
}
