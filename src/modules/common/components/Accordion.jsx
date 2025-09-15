import { APP_COLORS } from "../../../constants/colors";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { nextIcon } from "../../../constants/icons";
import { useState } from "react";
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  withTiming,
} from "react-native-reanimated";

const Accordion = ({ title, children, maxHeight }) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        "worklet";
        heightValue.value = withTiming(maxHeight, {
          duration: 200,
        });
      })();
    } else {
      heightValue.value = withTiming(0, { duration: 200 });
    }
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        className="w-full p-3 rounded-lg bg-gray-100 flex flex-row justify-between items-center"
      >
        <Text className="text-base uppercase font-bold">{title}</Text>

        <View className={`${isOpen ? "transform -rotate-90" : ""} w-6 h-6`}>
          <Image
            source={nextIcon}
            style={{
              width: "100%",
              height: "100%",
            }}
            tintColor={APP_COLORS.copyDarkLighter}
          />
        </View>
      </Pressable>

      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View className="py-2" style={{ height: maxHeight }}>
            {isOpen && children}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  contentContainer: {
    // position: "absolute",
    width: "100%",
    top: 0,
  },
});
