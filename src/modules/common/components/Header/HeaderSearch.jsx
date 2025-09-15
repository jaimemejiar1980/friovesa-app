import { APP_COLORS } from "../../../../constants/colors";
import { CITIES } from "../../../../constants/wordpress";
import { PressableGoBack } from "./PressableGoBack";
import { router, usePathname } from "expo-router";
import { searchIcon } from "../../../../constants/icons";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import lang from "../../../../lang/es";

export function HeaderSearch({
  isSearchActive = false,
  searchParameter,
  handleChangeText,
  handlePressSearch,
}) {
  const pathName = usePathname();

  const handlePress = () => {
    const pathCityName = pathName.split("/")[1];
    const currentCity = CITIES[pathCityName];
    const routerParams = new URLSearchParams({
      cityName: pathCityName,
      cityId: currentCity?.id,
    });

    router.navigate(`${pathCityName}/search?${routerParams}`);
  };

  return (
    <View className="bg-background border-b-2 border-b-gray-200/20">
      <View className="h-12 py-1 px-2 flex flex-row items-center">
        <View className="w-2/12">
          <PressableGoBack />
        </View>

        <View className="w-10/12">
          <Pressable
            onPress={handlePress}
            className="flex flex-row items-center justify-between bg-gray-200 rounded-md py-1.5 px-4"
          >
            <View className="w-10/12">
              {isSearchActive ? (
                <TextInput
                  autoFocus={true}
                  className="text-base text-black h-full"
                  placeholder="Buscar..."
                  value={searchParameter}
                  onChangeText={handleChangeText}
                  returnKeyType="search"
                  onSubmitEditing={handlePressSearch}
                />
              ) : (
                <Text className="text-base text-gray-400/80 pt-1 h-full">
                  {lang?.search}
                </Text>
              )}
            </View>

            <Image
              source={searchIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: APP_COLORS.copyLighter,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
