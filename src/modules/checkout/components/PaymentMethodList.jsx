import { ScrollView } from "react-native-gesture-handler";
import { useCheckout } from "../hooks";
import { View } from "react-native";
import PaymentMethod from "./PaymentMethod";
import React from "react";

export default function PaymentMethodList({ paymentMethods }) {
  const { paymentMethod, onchangePaymentMethod } = useCheckout();

  return (
    <ScrollView className="space-y-2">
      {paymentMethods.map((method, index) => (
        <View key={index}>
          <PaymentMethod
            method={method}
            isSelected={paymentMethod?.id === method?.id}
            handleSelect={() =>
              onchangePaymentMethod({
                id: method.id,
                title: method.title,
                instructions: method.instructions,
              })
            }
          />
        </View>
      ))}
    </ScrollView>
  );
}
