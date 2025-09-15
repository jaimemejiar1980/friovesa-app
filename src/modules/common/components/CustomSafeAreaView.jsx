import { SafeAreaView } from "react-native";

export default function CustomSafeAreaView({ children }) {
  return (
    <SafeAreaView className="bg-background h-full">{children}</SafeAreaView>
  );
}
