import { View } from "react-native";
import WebView from "react-native-webview";

export function ProductPriceHtml({ priceHtml }) {
  return (
    <View className="h-7 pt-1">
      <WebView
        scrollEnabled={false}
        originWhitelist={["*"]}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">

              <style>
                ::-webkit-scrollbar {
                  display: none; /* Hide scrollbars in WebKit based browsers */
                }
      
                * {
                  margin: 0;
                  padding: 0;
                  font-family: Roboto-Regular, sans-serif;
                  overflow: hidden;
                }
      
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  flex-direction: row;
                  overflow: hidden;
                }

                p {
                  max-width: 100%;
                  height: auto;
                  width: auto;
                  font-weight: bold;
                  overflow: hidden;
                }

                /* Extra styles to hide scrollbar */
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE 10+ */
              </style>
            </head>
            <body>
              <p>${priceHtml}</p>
            </body>
            </html>
          `,
        }}
        style={{
          flex: 1,
          height: "auto",
        }}
      />
    </View>
  );
}
