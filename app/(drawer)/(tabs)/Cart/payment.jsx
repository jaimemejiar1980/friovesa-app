import { Text, View } from "react-native";
import {
  CartCheckoutNavigationButtons,
  PaymentInstructions,
  PaymentMethodList,
  PaymentMethodListSkeleton,
  useCheckout,
  usePaymentMethods,
} from "../../../../src/modules/checkout";
import {
  ControlButtonCancel,
  ControlButtonSuccess,
  CustomModal,
  ErrorResults,
  useGlobalLoadingModal,
} from "../../../../src/modules/common";
import { errorToast, successToast } from "../../../../src/lib/Toast";
import { useAuth } from "../../../../src/modules/auth";
import { useCart } from "../../../../src/modules/cart";
import { useEffect, useState } from "react";
import { useOrder } from "../../../../src/modules/order";
import lang from "../../../../src/lang/es";

export default function Payment({ handleBack, handleNext }) {
  const { showLoadingModal, hideLoadingModal } = useGlobalLoadingModal();
  const { cart, cityName, cupon, afiliado } = useCart();
  const { user } = useAuth();
  const {
    isLoading: isPaymentMethodsLoading,
    isError: isPaymentMethodsError,
    paymentMethods,
  } = usePaymentMethods();
  const {
    paymentMethod,
    onchangePaymentMethod,
    onCreateOrder,
    shippingZone,
    billing,
    shipping,
  } = useCheckout();
  const { createOrder, isLoading, isError, createdOrder } = useOrder();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log(afiliado);
    if (paymentMethods) {
      onchangePaymentMethod(paymentMethods[0]);
    }
  }, [paymentMethods]);

  useEffect(() => {
    const handleAsyncOperations = async () => {
      if (isLoading) return;

      if (isError) {
        hideLoadingModal();
        errorToast({
          title: lang?.failedCreateOrder,
          slow: true,
        });
        return;
      }

      if (createdOrder.order.id) {
        onCreateOrder(createdOrder);
        successToast({
          title: lang.successCreateOrder,
        });
        handleNext();
      }
    };

    handleAsyncOperations();
  }, [isLoading, isError, createdOrder]);

  const handleOpenConfirmation = () => {
    setOpenModal(true);
  };

  const handleCreateOrder = async () => {
    setOpenModal(false);
    showLoadingModal();
    await createOrder({
      shippingZone,
      paymentMethod,
      billing,
      shipping,
      cart,
      customerId: user?.id,
      settings: {
        store: cityName,
      },
      cupon,
      afiliado
    });
    hideLoadingModal();
  };

  return (
    <>
      <View className="space-y-7">
        <View className="flex flex-col">
          {isPaymentMethodsLoading && <PaymentMethodListSkeleton />}

          {isPaymentMethodsError && (
            <View className="h-full pt-48">
              <ErrorResults infoMessage={lang?.failedPaymentMethods} />
            </View>
          )}

          {!isPaymentMethodsLoading &&
            !isPaymentMethodsError &&
            paymentMethods && (
              <PaymentMethodList paymentMethods={paymentMethods} />
            )}
        </View>

        <View>
          <CartCheckoutNavigationButtons
            handleBack={handleBack}
            handleNext={handleOpenConfirmation}
          />
        </View>
      </View>

      <CustomModal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        <View className="bg-white w-11/12 p-4 rounded-md">
          <View className="py-2 mb-4 space-y-5">
            <Text className="text-lg font-bold">{lang?.areYouSureToOrder}</Text>

            <View className="space-y-2">
              <Text className="text-base">{lang?.orderWillBeGenerated}</Text>

              <View className="h-52 md:h-36">
                <PaymentInstructions
                  instructions={
                    paymentMethod?.id !== "pagomedios"
                      ? paymentMethod.instructions
                      : lang?.genericPaymentInfo
                  }
                />
              </View>
            </View>
          </View>

          <View className="md:flex md:flex-row-reverse">
            <View className="md:w-6/12 md:pl-2">
              <ControlButtonSuccess
                title={lang?.continue}
                handlePress={handleCreateOrder}
              />
            </View>

            <View className="md:w-6/12 md:pr-2 pt-2 md:pt-0">
              <ControlButtonCancel
                title={lang?.cancel}
                handlePress={() => setOpenModal(false)}
              />
            </View>
          </View>
        </View>
      </CustomModal>

      {/* <CustomModal isOpen={isLoading}>
        <ShadowView extraStyles="p-2 bg-white rounded-full">
          <ActivityIndicator size="large" color={APP_COLORS.secondary} />
        </ShadowView>
      </CustomModal> */}
    </>
  );
}
