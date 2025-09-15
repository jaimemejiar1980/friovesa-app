import { View } from "react-native";

export default function ListContainer({ children, extraStyles }) {
  return (
    <>
      {children}
      <View className={`h-10 ${extraStyles}`} />
    </>
  );
}
