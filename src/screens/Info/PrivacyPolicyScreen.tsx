import { APP_INFO } from "@/constants";
import { CustomWebView } from "@/modules/common";

export function PrivacyPolicyScreen() {
  return (
    <CustomWebView
      htmlContent={`
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
          ${APP_INFO.PRIVACY_POLICY}
          </body>
          <style> 
            * {
              font-family: Roboto-Regular, sans-serif;
            }
            h1, h2, h3, h4 { color: #003e80; } 
            img { width: 100%; } 
            body { 
              margin-block: 0;
              font-size: 1rem;
              padding-right: 0.5rem;
              padding-bottom: 30px; 
            } 
            * {
              font-family: Roboto-Regular, sans-serif;
            }
          </style>
        </html>`}
    />
  );
}
