import { BASKET_ACTIONS } from "./BasketActions";
import { successToast } from "../../../lib/Toast";
import lang from "../../../lang/es";

function findProduct(collection, productId) {
  const productIndex = collection?.findIndex((item) => item.id === productId);
  const isInCollection = productIndex !== -1;

  return { productIndex, isInCollection };
}

function populate(state, action) {
  const { products, cityName } = action.payload;
  return {
    cityName: cityName,
    collection: products,
    renderToast: () => {},
  };
}

function add(state, action) {
  const { product, cityName, quantity } = action.payload;
  const { collection } = state;
  const { productIndex, isInCollection } = findProduct(collection, product?.id);
  const newQuantity = Number(quantity);

  if (!isInCollection) {
    return {
      cityName: cityName,
      collection: [
        ...collection,
        { ...action?.payload?.product, quantity: newQuantity },
      ],
      renderToast: () =>
        successToast({
          title: product?.name,
          subtitle: lang?.addToBasketSuccessfully,
        }),
    };
  }

  const currentQuantity = Number(collection[productIndex].quantity);

  const beforeProduct = collection?.slice(0, productIndex);
  const afterProduct = collection?.slice(productIndex + 1);
  const productQuantityAdded = {
    ...collection[productIndex],
    quantity: currentQuantity + newQuantity,
  };
  const newState = [...beforeProduct, productQuantityAdded, ...afterProduct];
  return {
    cityName: cityName,
    collection: newState,
    renderToast: () =>
      successToast({
        title: product?.name,
        subtitle: lang?.addToBasketSuccessfully,
      }),
  };
}

function decreaseQuantity(state, action) {
  const { productId } = action.payload;
  const { collection, cityName } = state;
  const { productIndex, isInCollection } = findProduct(collection, productId);

  if (!isInCollection) {
    return {
      cityName: cityName,
      collection: collection,
    };
  }

  const currentQuantity = Number(collection[productIndex].quantity);
  const willBeRemovedFromCollection = currentQuantity === 1;
  if (willBeRemovedFromCollection) {
    const newState = collection?.filter((item) => item.id !== productId);
    return {
      cityName: cityName,
      collection: newState,
    };
  }

  const beforeProduct = collection?.slice(0, productIndex);
  const afterProduct = collection?.slice(productIndex + 1);
  const productQuantityDecreased = {
    ...collection[productIndex],
    quantity: currentQuantity - 1,
  };

  const newState = [
    ...beforeProduct,
    productQuantityDecreased,
    ...afterProduct,
  ];
  return {
    cityName: cityName,
    collection: newState,
  };
}

function clearCollection() {
  return {
    cityName: "",
    collection: [],
    renderToast: () => {},
  };
}

const UPDATE_STATE = {
  [BASKET_ACTIONS.ADD]: add,
  [BASKET_ACTIONS.DECREASE_QUANTITY]: decreaseQuantity,
  [BASKET_ACTIONS.POPULATE]: populate,
  [BASKET_ACTIONS.CLEAR_COLLECTION]: clearCollection,
};

export function CollectionReducer(state, action) {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE[actionType];
  return updateState ? updateState(state, action) : state;
}
