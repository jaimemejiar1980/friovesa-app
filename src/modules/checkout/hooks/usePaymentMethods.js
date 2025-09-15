import { useQuery } from "@tanstack/react-query";
import { PaymentService } from "../services/PaymentService";

export default function usePaymentMethods() {
  const paymentService = new PaymentService();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["paymentMethod"],
    queryFn: async () => await paymentService.getPaymentMethods(),
  });

  return {
    isLoading,
    isError,
    paymentMethods: data,
  };
}
