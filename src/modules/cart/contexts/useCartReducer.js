import { CART_INITIAL_STATE, CartReducer, CART_ACTIONS } from "../reducers";
import { convertToMoney } from "../../../lib/utils";
import { PLAIN_STORE_KEYS } from "../../../constants/plainStoreKeys";
import { PlainStorage } from "../../../lib/PlainStorage";
import { useEffect, useRef } from "react";
import { useReducer } from "react";

export function useCartReducer() {
  const isFirstRender = useRef(true);
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);
  const { cart } = state;

  useEffect(() => {
    const saveCart = async () => {
      await PlainStorage.save(
        PLAIN_STORE_KEYS.CART,
        JSON.stringify({
          products: state?.cart,
          cityName: state?.cityName,
        })
      );
    };

    const prepareCart = async () => {
      const storedCart = await PlainStorage.getValueByKey("cart");
      const storedCartParsed = JSON.parse(storedCart);
      if (storedCartParsed?.products?.length > 0) {
        dispatch({
          type: CART_ACTIONS.POPULATE_CART,
          payload: storedCartParsed,
        });
      }
    };

    if (isFirstRender.current) {
      prepareCart();
      isFirstRender.current = false;
      return;
    } else {
      saveCart();
    }

    const renderToast = () => {
      try {
        state?.renderToast();
      } catch (error) {
        return;
      }
    };

    renderToast();
  }, [state]);

  const addBundledProductToCart = (product, cityName = "", quantity = 1) =>
    dispatch({
      type: CART_ACTIONS.ADD_BUNDLED_PRODUCT_TO_CART,
      payload: { product, cityName, quantity },
    });

  const addToCart = (product, cityName = "", quantity = 1) =>
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, cityName, quantity },
    });

  const clearCart = () =>
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
    });

  const decreaseQuantity = (productId) =>
    dispatch({
      type: CART_ACTIONS.DECREASE_QUANTITY,
      payload: { productId },
    });

  const removeFromCart = (productUUID) =>
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { productUUID },
    });

  const setQuantity = (productUUID, quantity) =>
    dispatch({
      type: CART_ACTIONS.SET_QUANTITY,
      payload: { productUUID, quantity },
    });

  const itemsCount = cart
    ?.map((product) => Number(product.quantity))
    .reduce((a, b) => a + b, 0);

  const rawTotal = cart
    ?.map((product) => Number(product.price) * Number(product.quantity))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  const total = convertToMoney(rawTotal);

  const cityName = state?.cart?.length === 0 ? "" : state?.cityName;

  const productQuantity = (productId) => {
    const product = cart?.find((product) => product.id === productId);
    return product?.quantity ?? 0;
  };

  return {
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
  };
}
