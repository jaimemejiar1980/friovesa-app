import { View } from "react-native";

export default function CarouselPagination({ items, activeIndex }) {
  return (
    <View className="flex flex-row items-center absolute bottom-1 py-1 px-1.5 bg-black/20 rounded-md space-x-1">
      {items.map((_, index) => (
        <View
          className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-400 ${
            activeIndex === index ? "bg-secondary" : ""
          }`}
          key={index}
        />
      ))}
    </View>
  );
}
