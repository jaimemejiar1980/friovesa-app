import {
  BankScreen,
  PagoMediosScreen,
} from "../../../../src/screens/OrderDetail";
import { useCheckout } from "../../../../src/modules/checkout";
import { AVAILABLE_PAYMENT_METHODS } from "../../../../src/constants/wordpress";

export default function OrderDetail() {
  const { paymentMethod } = useCheckout();

  const screens = {
    [AVAILABLE_PAYMENT_METHODS.BANK]: <BankScreen />,
    [AVAILABLE_PAYMENT_METHODS.PAGOMEDIOS]: <PagoMediosScreen />,
  };

  return screens[paymentMethod.id];
}
