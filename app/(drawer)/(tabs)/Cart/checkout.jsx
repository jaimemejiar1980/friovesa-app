import { CheckoutStatus } from "../../../../src/modules/checkout";
import {
  CustomSafeAreaView,
  ListContainer,
} from "../../../../src/modules/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Address from "./address";
import Delivery from "./delivery";
import lang from "../../../../src/lang/es";
import Payment from "./payment";
import Preview from "./preview";

export default function checkout() {
  const [checkoutState, setCheckoutState] = useState([
    {
      name: lang?.address,
      active: true,
      visited: true,
    },
    {
      name: lang?.shipping,
      active: false,
      visited: false,
    },
    {
      name: lang?.preview,
      active: false,
      visited: false,
    },
    {
      name: lang?.payment,
      active: false,
      visited: false,
    },
  ]);
  const [checkoutIndex, setCheckoutIndex] = useState(0);
  useEffect(() => {
    const updatedState = checkoutState?.map((item, index) => {
      if (index === checkoutIndex) {
        return {
          ...item,
          active: true,
          visited: true,
        };
      }

      return {
        ...item,
        active: false,
      };
    });

    setCheckoutState(updatedState);
  }, [checkoutIndex]);

  const handleContinue = () => {
    if (checkoutIndex === 3) {
      router.replace("(drawer)/(tabs)/Cart/OrderDetail");
      return;
    }

    setCheckoutIndex(checkoutIndex + 1);
  };

  const handleBack = () => {
    if (checkoutIndex === 0) {
      router.back();
      return;
    }

    setCheckoutIndex(checkoutIndex - 1);
  };

  const handleMove = (index) => {
    if (index >= checkoutIndex && !checkoutState[index]?.visited) {
      return;
    }

    setCheckoutIndex(index);
  };

  return (
    <CustomSafeAreaView>
      <View className="flex flex-row justify-between md:justify-center p-2 mb-2">
        <View>
          <CheckoutStatus
            title={lang?.address}
            isChecked={checkoutIndex >= 0}
            index={0}
            handleMove={handleMove}
            isVisited={checkoutState[0]?.visited}
          />
        </View>

        <View className="md:ml-5">
          <CheckoutStatus
            title={lang?.shipping}
            isChecked={checkoutIndex >= 1}
            index={1}
            handleMove={handleMove}
            isVisited={checkoutState[1]?.visited}
          />
        </View>

        <View className="md:ml-5">
          <CheckoutStatus
            title={lang?.preview}
            isChecked={checkoutIndex >= 2}
            index={2}
            handleMove={handleMove}
            isVisited={checkoutState[2]?.visited}
          />
        </View>

        <View className="md:ml-5">
          <CheckoutStatus
            title={lang?.payment}
            isChecked={checkoutIndex >= 3}
            index={3}
            handleMove={handleMove}
            isVisited={checkoutState[3]?.visited}
          />
        </View>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        className="px-2"
        extraHeight={50}
      >
        <ListContainer>
          {checkoutState[0]?.active && (
            <Address handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[1]?.active && (
            <Delivery handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[2]?.active && (
            <Preview handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[3]?.active && (
            <Payment handleBack={handleBack} handleNext={handleContinue} />
          )}
        </ListContainer>
      </KeyboardAwareScrollView>
    </CustomSafeAreaView>
  );
}
