import { AVAILABLE_PAYMENT_METHODS } from "../../../constants/wordpress";
import { OrderRequestFormatter } from "../helpers/OrderRequestFormatter";
import { OrderService } from "../../order/services";
import { useState } from "react";

export default function useOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [createdOrder, setCreatedOrder] = useState({
    order: {},
    payment: {},
  });

  const createOrder = async ({
    shippingZone,
    paymentMethod,
    billing,
    shipping,
    cart,
    customerId,
    settings,
    cupon,
    afiliado,
  }) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const { order } = new OrderRequestFormatter({
        shippingZone,
        paymentMethod,
        billing,
        shipping,
        cart,
        customerId,
        settings: {
          store: settings.store,
        },
        cupon,
        afiliado,
      });

      const paymentMethodId = paymentMethod.id;
      const orderCreator = orderCreatorMapper({ paymentMethodId });
      const createdOrder = await orderCreator(order);

      setCreatedOrder(createdOrder);
    } catch (error) {
      console.log("🚀 ~ useOrder ~ error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, isError, createdOrder };
}

function orderCreatorMapper({ paymentMethodId }) {
  const orderService = new OrderService();

  const paymentMethods = {
    [AVAILABLE_PAYMENT_METHODS.BANK]: async (order) => {
      return orderService.createBankOrder({ order });
    },
    [AVAILABLE_PAYMENT_METHODS.PAGOMEDIOS]: async (order) => {
      return orderService.createPagomediosOrder({ order });
    },
  };

  return paymentMethods[paymentMethodId];
}
