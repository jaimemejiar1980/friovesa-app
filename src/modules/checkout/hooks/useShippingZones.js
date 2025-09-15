import { Checkout } from "../services";
import { useQuery } from "@tanstack/react-query";

export default function useShippingZones() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["shippingZones"],
    queryFn: async () => await Checkout.getShippingZones(),
  });

  return {
    isLoading,
    isError,
    shippingZones: data,
  };
}
