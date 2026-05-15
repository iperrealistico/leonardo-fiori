export function GalleryArrowIcon({
  direction,
}: {
  direction: "previous" | "next";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="site-gallery-arrow-icon"
    >
      {direction === "previous" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}
