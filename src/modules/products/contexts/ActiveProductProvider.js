import { useRef, useState } from "react";

export default function ActiveProductProvider({ children }) {
  const [productId, setProductId] = useState(0);
  const screenTitle = useRef("");

  const setScreenTitle = (title) => {
    screenTitle.current = title;
  };

  const onActiveControl = (id) => {
    setProductId(id);
  };

  const isActive = (id) => {
    return productId === id;
  };

  return (
    <ActiveProductContext.Provider
      value={{
        isActive,
        onActiveControl,
        screenTitle: screenTitle.current,
        setScreenTitle,
      }}
    >
      {children}
    </ActiveProductContext.Provider>
  );
}
