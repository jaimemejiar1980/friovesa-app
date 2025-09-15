import { View, Text } from "react-native";

export default function DirectTransferGateway({ bankInfo }) {
  const { accountName, bankName, accountNumber, classificationCode, iban } =
    bankInfo;

  return (
    <View className="bg-gray-200 p-4 rounded-md">
      <Text className="text-xl mb-3 font-bold">{accountName}</Text>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Banco</Text>

        <Text className="uppercase font-bold">{bankName}</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Número de cuenta</Text>

        <Text className="uppercase font-bold">{accountNumber}</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Código de clasificación</Text>

        <Text className="uppercase font-bold">{classificationCode}</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">IBAM</Text>

        <Text className="font-bold">{iban}</Text>
      </View>
    </View>
  );
}
