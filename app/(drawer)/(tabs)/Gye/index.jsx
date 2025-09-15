import { GYE_CATEGORY_ID } from "../../../../src/constants/wordpress";
import CategoriesScreen from "../../../../src/screens/City/CategoriesScreen";

export default function index() {
  return <CategoriesScreen CategoryId={GYE_CATEGORY_ID} path="Gye" />;
}
