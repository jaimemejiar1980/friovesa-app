import { APP_COLORS } from "../../../../constants/colors";
import { dropDownIcon } from "../../../../constants/icons";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { memo, useCallback, useState } from "react";
import CustomModal from "../CustomModal";

function ModalPicker({ value, defaultValue, items, handlePickValue }) {
  const indexedItems = items?.map((item, index) => ({
    id: index,
    value: item.value,
    title: item.title,
  }));

  const [isActive, setIsActive] = useState(false);

  const handleOpen = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);

  const handleSelect = useCallback(
    (value) => {
      handlePickValue(value);
      handleOpen();
    },
    [handlePickValue, handleOpen]
  );

  return (
    <View>
      <Pressable
        className="px-4 py-2 flex flex-row justify-between items-center"
        onPress={handleOpen}
      >
        <Text numberOfLines={1} className="w-10/12">
          {value
            ? items.filter((item) => item.value === value)[0]?.title
            : defaultValue}
        </Text>

        <View>
          <Image
            source={dropDownIcon}
            style={{
              width: 20,
              height: 20,
            }}
            tintColor={APP_COLORS.copyDarkLighter}
          />
        </View>
      </Pressable>

      {isActive && (
        <CustomModal isOpen={true}>
          <View className="bg-white w-11/12 p-4 rounded-md h-fit max-h-[80vh]">
            <FlatList
              data={indexedItems}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`py-2 ${
                    item?.value === value ? "bg-slate-100" : null
                  }`}
                  onPress={() => handleSelect(item?.value)}
                >
                  <Text className="text-center text-base">{item?.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.id?.toString()}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
}

export default memo(ModalPicker);
