import WebView from "react-native-webview";

export default function PaymentInstructions({ instructions }) {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>${instructions}</body>
          <style>
            * {
              font-family: Roboto-Regular, sans-serif;
              font-size: 1rem;
            }
          </style>
        </html>`,
      }}
      style={{ height: "auto" }}
    />
  );
}
