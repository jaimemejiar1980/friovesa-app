import { API } from "../../../constants/wordpress";
import { APP_COLORS } from "../../../constants/colors";
import {
  BundledProductCard,
  BundledProductDescriptionSkeleton,
  BundledProductDetailsInfo,
  ProductDetailsImage,
  ProductsListSkeleton,
  useBasketReducer,
  useBundledProducts,
  useProduct,
} from "../../../modules/products";
import {
  CustomSafeAreaView,
  CustomWebView,
  ErrorResults,
  GoBackTabsHeader,
  ListContainer,
  NoResults,
  Shimmer,
} from "../../../modules/common";
import { ProductDescriptionAccordion } from "../../../modules/products/components/ProductDetails/ProductDescriptionAccordion";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import lang from "../../../lang/es";

const DESCRIPTION_HEIGHT = 100;

function BundledProductDescription({
  formattedTotal,
  total,
  imageUrl,
  name,
  productId,
  bundledProducts,
  price,
  formattedPrice,
  clearCollection,
}) {
  const { isLoading, isError, product } = useProduct({ id: productId });
  const descriptionRef = useRef("");

  const isMinimumReached = () => {
    const hasReachedMinimum = Number(total) >= Number(product?.totalLimitMin);
    if (product?.totalLimitMin && hasReachedMinimum) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (descriptionRef.current === "" && product?.shortDescription) {
      descriptionRef.current = product?.shortDescription;
    }
  }, [product]);

  return (
    <>
      <View>
        <GoBackTabsHeader />

        <ProductDetailsImage imageUrl={imageUrl} />
      </View>

      <View className="p-4 space-y-3">
        <View className="space-y-3">
          <Text className="text-xl font-bold">{name}</Text>
        </View>

        <View>
          <Text className="text-xl">{formattedTotal}</Text>
        </View>

        <View>
          <BundledProductDetailsInfo
            clearCollection={clearCollection}
            price={price}
            formattedPrice={formattedPrice}
            bundledProducts={bundledProducts}
            isLoading={isLoading}
            isError={isError}
            product={product}
            enabled={isMinimumReached()}
          />
        </View>

        {descriptionRef.current ? (
          <View className="space-y-5">
            <View
              style={{
                height: DESCRIPTION_HEIGHT,
              }}
            >
              <CustomWebView
                height={DESCRIPTION_HEIGHT}
                htmlContent={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body><p>${descriptionRef.current}</p></body>
                    <style>
                    * {
                    font-family: Roboto-Regular, sans-serif;
                    }
                    body {
                    margin: 0;
                    }
                    </style>
                    </html>
                    `}
              />
            </View>

            <View>
              <ProductDescriptionAccordion
                htmlDescription={product?.description}
              />
            </View>
          </View>
        ) : (
          <View className="space-y-5">
            <View
              style={{
                height: DESCRIPTION_HEIGHT,
              }}
            >
              <BundledProductDescriptionSkeleton height={DESCRIPTION_HEIGHT} />
            </View>

            <View className="h-12 rounded-lg overflow-hidden">
              <Shimmer />
            </View>
          </View>
        )}
      </View>
    </>
  );
}

export function BundledProductsDetailsScreen() {
  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedProduct = useLocalSearchParams();
  const { productId, name, imageUrl } = selectedProduct;
  const {
    add,
    decreaseQuantity,
    productQuantity,
    clearCollection,
    cityName,
    formattedTotal,
    total,
    products: bundledProducts,
  } = useBasketReducer({ productId });

  const {
    products,
    isLoading: isLoadingBundles,
    isError: isErrorBundles,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useBundledProducts({
    perPage: API.PRODUCTS.BUNDLES.RESULTS_PER_PAGE,
    productId: productId,
  });

  useEffect(() => {
    const changeColumns = () => {
      setColumns(width > 768 ? 3 : 2);
    };

    changeColumns();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoadingBundles || isRefreshing) {
    return (
      <CustomSafeAreaView>
        <BundledProductDescription
          clearCollection={() => clearCollection()}
          price={total}
          formattedPrice={formattedTotal}
          formattedTotal={formattedTotal}
          total={total}
          imageUrl={imageUrl}
          name={name}
          productId={productId}
          bundledProducts={bundledProducts}
        />

        <ProductsListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isErrorBundles) {
    return (
      <CustomSafeAreaView>
        <BundledProductDescription
          clearCollection={() => clearCollection()}
          price={total}
          formattedPrice={formattedTotal}
          formattedTotal={formattedTotal}
          total={total}
          imageUrl={imageUrl}
          name={name}
          productId={productId}
          bundledProducts={bundledProducts}
        />

        <View className="pt-48">
          <ErrorResults infoMessage={lang?.errorLoadingProducts} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (products?.length === 0) {
    return (
      <CustomSafeAreaView>
        <BundledProductDescription
          clearCollection={() => clearCollection()}
          price={total}
          formattedPrice={formattedTotal}
          formattedTotal={formattedTotal}
          total={total}
          imageUrl={imageUrl}
          name={name}
          productId={productId}
          bundledProducts={bundledProducts}
        />

        <View className="pt-48">
          <NoResults />
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="w-1/2 md:w-4/12">
            <BundledProductCard
              imageUrl={item?.imageUrl}
              name={item?.name}
              price={item?.formattedPrice}
              showCardControl={item?.inStock}
              maxQuantity={item?.stockQuantity}
              product={item}
              add={add}
              decreaseQuantity={decreaseQuantity}
              productQuantity={productQuantity}
              cityName={cityName}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.95}
        numColumns={columns}
        ListHeaderComponent={
          <BundledProductDescription
            clearCollection={() => clearCollection()}
            price={total}
            formattedPrice={formattedTotal}
            formattedTotal={formattedTotal}
            total={total}
            imageUrl={imageUrl}
            name={name}
            productId={productId}
            bundledProducts={bundledProducts}
          />
        }
        ListFooterComponent={
          <ListContainer>
            {hasNextPage ? <ProductsListSkeleton /> : null}
          </ListContainer>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[APP_COLORS.secondary]}
          />
        }
      />
    </CustomSafeAreaView>
  );
}
