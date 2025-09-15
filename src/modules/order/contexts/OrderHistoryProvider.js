import { useState } from "react";

export default function OrderHistoryProvider({ children }) {
  const [orderHistory, setOrderHistory] = useState({});

  const onSelectOrderHistory = (order) => {
    setOrderHistory(order);
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orderHistory,
        onSelectOrderHistory,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}
