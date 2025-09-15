import { CheckoutContext } from "../contexts";
import { useContext } from "react";

export default function useCheckout() {
  return useContext(CheckoutContext);
}
