import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { GlobalLoadingModal } from "../components";

export const GlobalLoadingModalContext = createContext();

export function GlobalLoadingModalProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router && modalVisible) {
      setModalVisible(false);
    }
  }, [router]);

  const showLoadingModal = () => {
    setModalVisible(true);
  };

  const hideLoadingModal = () => {
    setModalVisible(false);
  };

  return (
    <GlobalLoadingModalContext.Provider
      value={{
        showLoadingModal,
        hideLoadingModal,
      }}
    >
      {children}
      <GlobalLoadingModal isOpen={modalVisible} />
    </GlobalLoadingModalContext.Provider>
  );
}
