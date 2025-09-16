import { CartContext } from "./CartContext";
import { useCartReducer } from "./useCartReducer";
import { useState } from "react";

export function CartProvider({ children }) {
  const {
    addBundledProductToCart,
    addToCart,
    cityName,
    clearCart,
    decreaseQuantity,
    itemsCount,
    productQuantity,
    removeFromCart,
    setQuantity,
    state,
    total,
  } = useCartReducer();

  const [cupon, setCupon] = useState("");
  const [afiliado, setAfiliado] = useState("");

  const updateCupon = (value) => {
    setCupon(value);
  };
  const updateAfiliado = (value) => {
    setAfiliado(value);
  };

  return (
    <CartContext.Provider
      value={{
        addBundledProductToCart,
        addToCart,
        cart: state?.cart,
        cityName,
        clearCart,
        decreaseQuantity,
        itemsCount,
        productQuantity,
        removeFromCart,
        setQuantity,
        total,
        cupon,
        updateCupon,
        afiliado,
        updateAfiliado
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
