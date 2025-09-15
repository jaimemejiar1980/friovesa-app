import { ScrollView } from "react-native-gesture-handler";
import ShippingZone from "./ShippingZone";
import useCheckout from "../hooks/useCheckout";

export default function ShippingZonesList({ shippingZones }) {
  const { shippingZone, onChangeShippingZone } = useCheckout();
  
  const handlePress = (zone) => {
      onChangeShippingZone(zone);
  };

  return (
    <ScrollView>
      {shippingZones.map((zone) => (
        <ShippingZone
          key={zone?.id}
          zone={zone}
          isSelected={shippingZone?.id === zone?.id}
          onPress={() => handlePress(zone)}
        />
      ))}
    </ScrollView>
  );
}
