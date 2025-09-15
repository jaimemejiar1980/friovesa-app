import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { View, Modal } from "react-native";
import CustomToast from "./CustomToast";

export default function CustomModal({
  isOpen,
  children,
  withInput,
  handleClose,
  ...props
}) {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
      {...props}
    >
      {withInput ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={50}
          style={{
            flex: 1,
          }}
          className="px-3 bg-zinc-900/40"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View className="items-center justify-center flex-1 px-3 bg-zinc-900/40">
          {children}
        </View>
      )}

      <CustomToast />

      <StatusBar style="light" />
    </Modal>
  );
}
