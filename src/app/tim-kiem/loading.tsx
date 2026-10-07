export default function Loading() {
  return (
    <div className="container loading-page" role="status" aria-label="Đang tải kết quả tìm kiếm">
      <div className="skeleton skeleton-eyebrow" />
      <div className="skeleton skeleton-heading" />
      <div className="skeleton skeleton-description" />
      <div className="posts-grid">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-description" />
          </div>
        ))}
      </div>
      <span className="sr-only">Đang tải kết quả tìm kiếm…</span>
    </div>
  );
}
