import { GlobalLoadingModalContext } from "../providers";
import { useContext } from "react";

export function useGlobalLoadingModal() {
  return useContext(GlobalLoadingModalContext);
}
