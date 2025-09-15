import { Linking } from "react-native";
import WebView from "react-native-webview";

export default function CustomWebView({ height = 800, htmlContent }) {
  const handleShouldStartLoad = (event) => {
    const { url, navigationType } = event;
    const isExternalLink =
      url === "about:blank" ? navigationType === "click" : true;
    if (
      url?.startsWith("http://") ||
      (url?.startsWith("https://") && isExternalLink)
    ) {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          }
        })
        .catch((error) => {
          console.log(
            "🚀 ~ ProductDescriptionAccordion ~ handleShouldStartLoad ~ error:",
            error
          );
        });
      return false;
    }

    return true;
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: htmlContent,
      }}
      style={{ height: height, flex: 1 }}
      onShouldStartLoadWithRequest={handleShouldStartLoad}
    />
  );
}
