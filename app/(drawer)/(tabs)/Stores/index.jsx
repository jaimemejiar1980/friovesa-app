import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { router } from "expo-router";

export default function Index() {
  const [store, setStore] = useState("");
  const isFocused = useIsFocused();
  

  useFocusEffect(
    useCallback(() => {
      // 🚀 Esto se ejecuta cada vez que entras al tab
      console.log("Refrescando Home...");
      const loadStore = async () => {
        try {
          const getstore = await AsyncStorage.getItem('store');
          console.log("STORE:-> " + getstore);
          //setStore(getstore);
          router.replace(`(drawer)/(tabs)/${getstore}`);
        } catch (error) {
          console.error("Error leyendo AsyncStorage:", error);
        }
      };
      loadStore();
      //loadStore();
      // Si necesitas cleanup:
      //return () => console.log("Saliendo de Home");
    }, [])
  );

  if (!store) {
    return null; 
  }

  return <Redirect href={`(drawer)/(tabs)/${store}`} />;
}