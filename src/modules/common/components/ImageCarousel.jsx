import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "./ImageUrlErrorBoundary";
import { View } from "react-native";
import CarouselPagination from "./CarouselPagination";
import PagerView from "react-native-pager-view";
import React, { useEffect, useRef, useState } from "react";
import ShadowView from "./ShadowView";

export default function ImageCarousel({
  images,
  autoPlay = false,
  intervalTime = 3000,
}) {
  const pagerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from 1 because the first element was cloned
  const totalImages = images.length;

  // Clone the first and last element to create the loop effect
  const extendedImages = [
    images[totalImages - 1], // last element cloned at the beginning
    ...images,
    images[0], // first element cloned at the end
  ];

  useEffect(() => {
    let interval;

    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, intervalTime);
    }

    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, currentIndex]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    pagerRef.current?.setPage(nextIndex);
  };

  const handlePageChange = (e) => {
    const position = e.nativeEvent.position;

    if (position === 0) {
      // If the index is the clone of the last element, jump instantly to the last real element
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(totalImages);
        setCurrentIndex(totalImages);
      }, 50); // Small delay to smooth the transition
    } else if (position === totalImages + 1) {
      // if the index is the clone of the first element, jump instantly to the first real element
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(1);
        setCurrentIndex(1);
      }, 50);
    } else {
      setCurrentIndex(position);
    }
  };

  return (
    <ShadowView extraStyles="bg-border h-48 md:h-96 rounded-lg overflow-hidden">
      <PagerView
        style={{ flex: 1 }}
        initialPage={1} // start from the first real image
        ref={pagerRef}
        onPageSelected={handlePageChange}
      >
        {extendedImages?.map((item, index) => (
          <View className="bg-border" key={index}>
            <ImageUrlErrorBoundary
              imageUrl={item}
              fallback={<View className="w-full h-full bg-gray-200" />}
            >
              <Image
                source={{ uri: item }}
                style={{ width: "100%", height: "100%" }}
                contentFit="fill"
              />
            </ImageUrlErrorBoundary>
          </View>
        ))}
      </PagerView>

      <View className="flex flex-row justify-center">
        <CarouselPagination items={images} activeIndex={currentIndex - 1} />
      </View>
    </ShadowView>
  );
}
