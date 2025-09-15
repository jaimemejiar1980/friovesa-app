import { OrderHistoryContext } from "../contexts";
import { useContext } from "react";

export default function useOrderHistory() {
  return useContext(OrderHistoryContext);
}
