import { HeaderSearch } from "../../../../src/modules/common";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <HeaderSearch />,
        }}
      />
      <Stack.Screen
        name="subcategory/[id]"
        options={{
          header: () => <HeaderSearch />,
        }}
      />
      <Stack.Screen
        name="list/[id]"
        options={{
          header: () => <HeaderSearch />,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
