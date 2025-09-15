import Toast from "react-native-toast-message";

export function successToast({ title = "", subtitle = "", slow = false }) {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: "success",
      text1: title,
      text2: subtitle,
      visibilityTime: slow ? 5000 : 2000,
      onHide: Toast.hide(),
    });
  }, 50);
}

export function errorToast({ title = "", subtitle = "", slow = false }) {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: "error",
      text1: title,
      text2: subtitle,
      visibilityTime: slow ? 5000 : 2000,
      onHide: Toast.hide(),
    });
  }, 50);
}

export function infoToast({ title = "", subtitle = "", slow = false }) {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: "info",
      text1: title,
      text2: subtitle,
      visibilityTime: slow ? 5000 : 2000,
      onHide: Toast.hide(),
    });
  }, 50);
}
