import { useLocalSearchParams } from "expo-router";
import SubcategoriesScreen from "../../../../../src/screens/City/SubcategoriesScreen";

export default function GyeSubcategory() {
  const { id, parentId } = useLocalSearchParams();

  return <SubcategoriesScreen categoryId={id} parentId={parentId} path="Gye" />;
}
