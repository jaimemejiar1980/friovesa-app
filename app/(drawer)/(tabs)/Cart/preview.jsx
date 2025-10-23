import {
  CartCheckoutNavigationButtons,
  CartCheckoutProduct,
  useCheckout,
} from "../../../../src/modules/checkout";
import {
  useGlobalLoadingModal,
} from "../../../../src/modules/common";
import { API } from "../../../../src/constants/wordpress";
import { convertToMoney, sumMoneyList, removeHtmlTags } from "../../../../src/lib/utils";
import { useCart } from "../../../../src/modules/cart";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import lang from "../../../../src/lang/es";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import { apiPrivate } from "../../../../src/axios";
import { useState, useEffect } from "react";
import { errorToast, successToast } from "../../../../src/lib/Toast";

export default function Preview({ handleBack, handleNext }) {
  const { cart, total, cupon, updateCupon, afiliado, updateAfiliado} = useCart();
  const { shippingZone } = useCheckout();
  const { showLoadingModal, hideLoadingModal } = useGlobalLoadingModal();
  //const [ cupon, setCupon ] = useState("");
  const [ descuento, setDescuento ] = useState(0);
  const [ totalSum, setTotalSum ] = useState(0);
  const [ afiliados, setAfiliados ] = useState([]);
  //const [ selectedAfiliado, setSelectedAfiliado] = useState(null);

  
  const applyClick = async (e) => {
    if(descuento != 0){
      successToast({
        title: "Ya tiene un Cupón aplicado",
      });
      return;
    }
    showLoadingModal();
    const response = await apiPrivate.get(API.COUPON.GET_ALL.URL);
    
    const responseJson = response.data;
  
    responseJson.forEach(element => {
      
      if(element.status == 'publish' && element.code == cupon){
        if(element.date_expires){
          const fecha = new Date(element.date_expires.substring(0,10)); // ejemplo
          const ahora = new Date();
          if(fecha < ahora){
            errorToast({
              title: "El Cupón ha expirado, no es válido",
              slow: true,
            });
            const timer = setTimeout(() => {
              hideLoadingModal();
            }, 3000);
            return;
          }
        }else{
          errorToast({
            title: "El Cupón no es válido",
            slow: true,
          });
          const timer = setTimeout(() => {
            hideLoadingModal();
          }, 3000);
          return;
        }
        setDescuento(element.amount);
        
        //console.log(parseFloat((totalSum - element.amount).toFixed(2)));
        if(parseFloat((totalSum - element.amount).toFixed(2)) < 0){
          setTotalSum("0.00");
        }else{
          setTotalSum(parseFloat((totalSum - element.amount).toFixed(2)));
        }
        updateCupon(element.code);
        successToast({
          title: "Cupón aplicado correctamente",
        });
        const timer = setTimeout(() => {
          hideLoadingModal();
        }, 3000);
        
        return;
      }
      
    });
    
    errorToast({
      title: "Cupón no encontrado",
      slow: true,
    });
    const timer = setTimeout(() => {
      hideLoadingModal();
    }, 3000);
    return;
  };
  
  useEffect(() => {
    const totalP = sumMoneyList([total, shippingZone?.costPerOrder]).substring(1);
    setTotalSum(totalP);
    const getAfiliados = async () =>{
      const response = await apiPrivate.get(API.AFFILIATES.GET_ALL.URL);
      //console.log(response.data);
      setAfiliados(response.data);  
    }
    getAfiliados();
    
  }, []); 

  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      height: 40,
      backgroundColor: '#E9ECEF',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

  return (
    <>
      <View className="space-y-7">
        <View className="py-1">
          {cart?.map((item, index) => (
            <View key={index}>
              <CartCheckoutProduct product={item} />

              <View className="h-[1px] bg-gray-100 mt-2 mb-4" />
            </View>
          ))}

          <View className="w-full px-4 py-2 space-y-2">
            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-base">
                {lang.subtotal}:
              </Text>

              <Text className="text-copy-light text-base">{total}</Text>
            </View>
            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-base">
                {lang.shipping}:
              </Text>

              <Text className="text-copy-light text-base">
                {shippingZone?.costPerOrder}
              </Text>
            </View>
            <View className="w-full flex flex-wrap flex-row justify-between" style={{ display: descuento != 0 ? 'flex' : 'none' }}>
              <Text className="text-copy-light text-base">
                Descuento
              </Text>
              <Text className="text-copy-light text-base ">
                ${descuento}
              </Text>
            </View>            
            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-xl font-bold">
                {lang.total}
              </Text>

              <Text className="text-copy-light text-xl font-bold">
                  ${totalSum}
              </Text>
            </View>
            <View className="w-full pt-3 flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-lg">
                Cupón de descuento
              </Text>
            </View>
            <View className="w-full mb-1 flex flex-wrap flex-row justify-between">
              <TextInput
                className="border border-border rounded-md w-[60%]"
                style={{ height: 40, borderColor: 'gray' }}
                value={cupon}
                onChangeText={newText => updateCupon(newText)}
                autoCapitalize="none"
                placeholder="Ingresa tu cupón"
              />
              <TouchableOpacity
                className=" rounded-md border border-gray-300 bg-success w-[30%]"
                onPress={applyClick}
              >
                <Text className="text-center text-base text-white pt-2">Aplicar</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-lg">
                Referido
              </Text>
            </View>
            <View className="w-full flex flex-wrap flex-row justify-betweern">
              <SelectDropdown
                  data={afiliados}
                  defaultButtonText="Seleccione una opción"
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem.affiliate_id);
                    updateAfiliado(selectedItem.affiliate_id);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle} >
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.name) || 'Selecciona un referido'}
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        <View>
          <CartCheckoutNavigationButtons
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </View>
      </View>
    </>
  );
}
