import { Accordion, CustomWebView } from "../../../common";
import lang from "../../../../lang/es";

export function ProductDescriptionAccordion({ htmlDescription }) {
  return (
    <Accordion title={lang.description} maxHeight={1800}>
      <CustomWebView
        htmlContent={`
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body><p>${htmlDescription}</p></body>
            <style>
            * {
              font-family: Roboto-Regular, sans-serif;
            }
            body {
              margin: 0;
              padding-right: 1rem;
            }
            </style>
            </html>
          `}
      />
    </Accordion>
  );
}
