import { CartContext } from "../contexts";
import { useContext } from "react";

export default function useCart() {
  return useContext(CartContext);
}
