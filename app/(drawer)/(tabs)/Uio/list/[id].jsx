import { useLocalSearchParams } from "expo-router";
import ProductsListScreen from "../../../../../src/screens/City/ProductsListScreen";

export default function UioProductsList() {
  const { id, parentId } = useLocalSearchParams();

  return <ProductsListScreen categoryId={id} parentId={parentId} />;
}
