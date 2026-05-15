"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { GalleryArrowIcon } from "@/components/gallery/gallery-arrow-icon";
import { ResponsiveGalleryImage } from "@/components/gallery/responsive-gallery-image";
import {
  buildResponsiveImageSrcSet,
  GALLERY_IMAGE_SIZES,
  getResponsiveImageFallbackSrc,
} from "@/lib/site/responsive-images";
import type { GalleryImageAsset, GalleryManifest } from "@/types/content";

const SWIPE_THRESHOLD_PX = 50;

function getWrappedIndex(index: number, total: number) {
  return (index + total) % total;
}

function GalleryArrowButton({
  direction,
  className,
  onClick,
}: {
  direction: "previous" | "next";
  className: string;
  onClick: () => void;
}) {
  const label = direction === "previous" ? "Previous photo" : "Next photo";

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      <GalleryArrowIcon direction={direction} />
    </button>
  );
}

export function InteractiveGallery({ gallery }: { gallery: GalleryManifest }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const preloadedPathsRef = useRef(new Set<string>());

  const totalImages = gallery.images.length;
  const currentImage = gallery.images[currentIndex];

  const preloadImage = useEffectEvent((image: GalleryImageAsset) => {
    const fallbackSource = getResponsiveImageFallbackSrc(image);

    if (preloadedPathsRef.current.has(fallbackSource)) {
      return;
    }

    const preloadedImage = new window.Image();
    preloadedImage.decoding = "async";
    preloadedImage.sizes = GALLERY_IMAGE_SIZES;
    preloadedImage.srcset = buildResponsiveImageSrcSet(image, "jpg");
    preloadedImage.src = fallbackSource;
    preloadedPathsRef.current.add(fallbackSource);
  });

  function showNextPhoto() {
    setCurrentIndex((index) => getWrappedIndex(index + 1, totalImages));
  }

  function showPreviousPhoto() {
    setCurrentIndex((index) => getWrappedIndex(index - 1, totalImages));
  }

  const handleArrowKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousPhoto();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextPhoto();
    }
  });

  useEffect(() => {
    if (totalImages <= 1) {
      return;
    }

    const previousIndex = getWrappedIndex(currentIndex - 1, totalImages);
    const nextIndex = getWrappedIndex(currentIndex + 1, totalImages);

    preloadImage(gallery.images[previousIndex]);
    preloadImage(gallery.images[nextIndex]);
  }, [currentIndex, gallery.images, totalImages]);

  useEffect(() => {
    if (totalImages <= 1) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      handleArrowKey(event);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [totalImages]);

  return (
    <>
      <div
        id="gallery"
        className="site-gallery-container"
        onTouchStart={(event) => {
          touchStartXRef.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchMove={(event) => {
          if (touchStartXRef.current === null) {
            return;
          }

          const touchEndX = event.touches[0]?.clientX;

          if (typeof touchEndX !== "number") {
            return;
          }

          const diff = touchStartXRef.current - touchEndX;

          if (Math.abs(diff) > SWIPE_THRESHOLD_PX) {
            if (diff > 0) {
              showNextPhoto();
            } else {
              showPreviousPhoto();
            }

            touchStartXRef.current = null;
          }
        }}
        onTouchEnd={() => {
          touchStartXRef.current = null;
        }}
      >
        <figure className="site-gallery-frame">
          <div className="site-gallery-photo-wrapper">
            <ResponsiveGalleryImage
              key={currentImage.id}
              asset={currentImage}
              eager
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              sizes={GALLERY_IMAGE_SIZES}
              className="site-gallery-photo"
            />
          </div>
        </figure>
      </div>
      <GalleryArrowButton
        direction="previous"
        className="site-gallery-arrow site-gallery-arrow-button site-gallery-arrow--prev"
        onClick={() => {
          showPreviousPhoto();
        }}
      />
      <GalleryArrowButton
        direction="next"
        className="site-gallery-arrow site-gallery-arrow-button site-gallery-arrow--next"
        onClick={() => {
          showNextPhoto();
        }}
      />
      <div className="site-gallery-mobile-controls">
        <GalleryArrowButton
          direction="previous"
          className="site-gallery-arrow site-gallery-arrow-button"
          onClick={() => {
            showPreviousPhoto();
          }}
        />
        <GalleryArrowButton
          direction="next"
          className="site-gallery-arrow site-gallery-arrow-button"
          onClick={() => {
            showNextPhoto();
          }}
        />
      </div>
    </>
  );
}
