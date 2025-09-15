import ShadowView from "./ShadowView";

export default function Card({ additionalStyles, children }) {
  return (
    <ShadowView
      extraStyles={`${additionalStyles} rounded-md m-1 bg-white border border-border`}
    >
      {children}
    </ShadowView>
  );
}
