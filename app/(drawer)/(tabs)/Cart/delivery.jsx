import {
  CartCheckoutNavigationButtons,
  ShippingZonesList,
  ShippingZonesListSkeleton,
  useCheckout,
  useShippingZones,
} from "../../../../src/modules/checkout";
import { ErrorResults } from "../../../../src/modules/common";
import { errorToast } from "../../../../src/lib/Toast";
import { View } from "react-native";
import lang from "../../../../src/lang/es";

export default function Delivery({ handleNext, handleBack }) {
  const { isLoading, isError, shippingZones } = useShippingZones();
  const { shippingZone } = useCheckout();

  const handleContinue = () => {
    if (!shippingZone?.isSelected) {
      errorToast({
        title: lang.pleaseSelectShippingZone,
        slow: true,
      });

      return;
    }

    handleNext();
  };

  return (
    <>
      <View className="space-y-7">
        <View>
          {isLoading && <ShippingZonesListSkeleton />}

          {isError && (
            <View className="h-full pt-48">
              <ErrorResults infoMessage={lang?.failedShippingZones} />
            </View>
          )}

          {!isLoading && !isError && shippingZones && (
            <ShippingZonesList shippingZones={shippingZones} />
          )}
        </View>

        {!isLoading && !isError && shippingZones && (
          <View>
            <CartCheckoutNavigationButtons
              handleBack={handleBack}
              handleNext={handleContinue}
            />
          </View>
        )}
      </View>
    </>
  );
}
