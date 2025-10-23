import { APP_INFO } from "@/constants";
import { CustomSafeAreaView, CustomWebView } from "@/modules/common";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Affiliate() {
  const injectedCSS = `
  (function() {
    const css = ".oxy-sticky-header { display: none !important; }  .dgwt-wcas-sf-wrapp { display: none !important; } .ct-section-with-shape-divider { display:none !important; } .cky-btn-revisit-wrapper {display:none !important; } .joinchat {display:none !important;} #scroll-down-button {display:none !important;} #wpadminbar {display: none !important; }";
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  })();
  true;
`;
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: API_URL + "/cuenta-de-afiliado-friovesa/" }}
        injectedJavaScriptBeforeContentLoaded={injectedCSS}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});