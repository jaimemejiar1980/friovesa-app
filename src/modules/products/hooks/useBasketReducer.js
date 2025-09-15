import { convertToMoney } from "../../../lib/utils";
import { PLAIN_STORE_KEYS } from "../../../constants/plainStoreKeys";
import { PlainStorage } from "../../../lib/PlainStorage";
import { useEffect, useRef } from "react";
import { useReducer } from "react";
import {
  CollectionReducer,
  BASKET_ACTIONS,
  COLLECTION_INITIAL_STATE,
} from "../reducers";

export function useBasketReducer({ productId }) {
  const isFirstRender = useRef(true);
  const [state, dispatch] = useReducer(
    CollectionReducer,
    COLLECTION_INITIAL_STATE
  );
  const { collection } = state;

  useEffect(() => {
    const saveInPlainStorage = async () => {
      await PlainStorage.save(
        `${PLAIN_STORE_KEYS.BASKET}_${productId}`,
        JSON.stringify({
          products: state?.collection,
          cityName: state?.cityName,
        })
      );
    };

    const restoreFromPlainStorage = async () => {
      const stored = await PlainStorage.getValueByKey(
        `${PLAIN_STORE_KEYS.BASKET}_${productId}`
      );
      const storedParsed = JSON.parse(stored);
      if (storedParsed?.products?.length > 0) {
        dispatch({
          type: BASKET_ACTIONS.POPULATE,
          payload: storedParsed,
        });
      }
    };

    if (isFirstRender.current) {
      restoreFromPlainStorage();
      isFirstRender.current = false;
      return;
    } else {
      saveInPlainStorage();
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

  const add = (product, cityName = "", quantity = 1) =>
    dispatch({
      type: BASKET_ACTIONS.ADD,
      payload: { product, cityName, quantity },
    });

  const decreaseQuantity = (productId) =>
    dispatch({
      type: BASKET_ACTIONS.DECREASE_QUANTITY,
      payload: { productId },
    });

  const clearCollection = async () => {
    await PlainStorage.delete(`${PLAIN_STORE_KEYS.BASKET}_${productId}`);

    return dispatch({
      type: BASKET_ACTIONS.CLEAR_COLLECTION,
    });
  };

  const itemsCount = collection
    ?.map((product) => Number(product.quantity))
    .reduce((a, b) => a + b, 0);

  const total = collection
    ?.map((product) => Number(product.price) * Number(product.quantity))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  const formattedTotal = convertToMoney(total);

  const cityName = state?.collection?.length === 0 ? "" : state?.cityName;

  const productQuantity = (productId) => {
    const product = collection?.find((product) => product.id === productId);
    return product?.quantity ?? 0;
  };

  return {
    add,
    cityName,
    decreaseQuantity,
    clearCollection,
    itemsCount,
    productQuantity,
    products: state?.collection ?? [],
    total,
    formattedTotal,
    collection,
  };
}
