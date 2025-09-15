import { API } from "../../../constants/wordpress";
import { FlatList } from "react-native-gesture-handler";
import { RelatedProductsListSkeleton } from "./skeletons";
import { Text, View } from "react-native";
import { useRelatedProducts } from "../hooks";
import lang from "../../../lang/es";
import { ProductCardFactory } from "./ProductCards/";

export default function RelatedProductsList({ productId, relatedIds }) {
  const {
    products: relatedProducts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useRelatedProducts({
    perPage: API.PRODUCTS.RELATED_RESULTS_PER_PAGE,
    relatedIds,
    productId,
  });

  const handleFetchNextRelatedProductsPage = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  let content = null;

  if (isLoading) {
    content = <RelatedProductsListSkeleton />;
  } else if (isError) {
    content = <Text>{lang.noResults}</Text>;
  } else if (relatedProducts.length === 0) {
    content = <Text>{lang.noResults}</Text>;
  } else {
    content = (
      <FlatList
        horizontal
        style={{
          paddingBottom: 10,
        }}
        data={relatedProducts}
        renderItem={({ item }) => (
          <View key={item.id} className="w-44">
            <ProductCardFactory product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleFetchNextRelatedProductsPage}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          hasNextPage ? <RelatedProductsListSkeleton /> : null
        }
      />
    );
  }

  return (
    <View>
      <Text className="text-lg font-bold">{lang.relatedProducts}</Text>
      {content}
    </View>
  );
}
