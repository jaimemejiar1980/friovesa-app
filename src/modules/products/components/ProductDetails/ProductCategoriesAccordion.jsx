import { Accordion } from "../../../common";
import { View, Text } from "react-native";
import lang from "../../../../lang/es";

export function ProductCategoriesAccordion({ categories }) {
  return (
    <Accordion title={lang.categories} maxHeight={170}>
      <View className="flex flex-row flex-wrap">
        {categories?.map((category, index) => (
          <Text
            key={index}
            className="text-secondary font-bold uppercase text-base py-2 px-3"
          >
            {category}
          </Text>
        ))}
      </View>
    </Accordion>
  );
}
