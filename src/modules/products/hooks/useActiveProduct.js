import { ActiveProductContext } from "../contexts";
import { useContext } from "react";

export default function useActiveProduct() {
  return useContext(ActiveProductContext);
}
