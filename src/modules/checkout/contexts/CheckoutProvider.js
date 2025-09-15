import { PLAIN_STORE_KEYS } from "../../../constants/plainStoreKeys";
import { PlainStorage } from "../../../lib/PlainStorage";
import { useEffect, useState } from "react";
import CheckoutContext from "./CheckoutContext";

export default function CheckoutProvider({ children }) {
  const [createdOrder, setCreatedOrder] = useState({
    order: {},
    payment: {},
  });

  const [billing, setBilling] = useState({
    businessType: "",
    documentType: "",
    identification: "",
    name: "",
    lastName: "",
    address: "",
    addressStreet: "",
    sector: "",
    phone: "",
    email: "",
    addressLatitude: "",
    addressLongitude: "",
    additionalNotes: "",
    isShippingDifferent: false,
  });

  const [shipping, setShipping] = useState({
    businessName: "",
    address: "",
    identification: "",
    phone: "",
    email: "",
  });

  const [shippingZone, setShippingZone] = useState({
    id: "",
    instanceId: "",
    title: "",
    order: "",
    description: "",
    costPerOrder: "",
    methodId: "",
    isSelected: false,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    id: "",
    title: "",
    instructions: "",
  });

  useEffect(() => {
    const prepareAddress = async () => {
      const [storedBilling, storedShipping] = await Promise.all([
        PlainStorage.getValueByKey(PLAIN_STORE_KEYS.BILLING),
        PlainStorage.getValueByKey(PLAIN_STORE_KEYS.SHIPPING),
      ]);
      if (!storedBilling) {
        return;
      }
      const parsedBilling = JSON.parse(storedBilling);
      setBilling(parsedBilling);

      const parsedShipping = JSON.parse(storedShipping);
      if (parsedShipping) {
        setShipping(parsedShipping);
      }
    };

    prepareAddress();
  }, []);

  const onChangeBilling = (value, key) => {
    setBilling((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeShipping = (value, key) => {
    setShipping((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveAddress = async () => {
    await Promise.all([
      PlainStorage.save(PLAIN_STORE_KEYS.BILLING, JSON.stringify(billing)),
      PlainStorage.save(PLAIN_STORE_KEYS.SHIPPING, JSON.stringify(shipping)),
    ]);
  };

  const onChangeShippingZone = ({
    id,
    instanceId,
    title,
    order,
    description,
    costPerOrder,
    methodId,
  }) => {
    setShippingZone({
      id,
      instanceId,
      title,
      order,
      description,
      costPerOrder,
      methodId,
      isSelected: true,
    });
  };

  const onchangePaymentMethod = ({ id, title, instructions }) => {
    setPaymentMethod({ id, title, instructions });
  };

  const onCreateOrder = ({ order, payment }) => {
    setCreatedOrder({
      order,
      payment,
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        billing,
        createdOrder,
        onChangeBilling,
        onchangePaymentMethod,
        onChangeShipping,
        onChangeShippingZone,
        onCreateOrder,
        onSaveAddress,
        paymentMethod,
        shipping,
        shippingZone,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
