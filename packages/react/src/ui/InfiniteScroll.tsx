import React, { useEffect, useRef, useState } from "react";

export interface InfiniteScrollProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loader?: React.ReactNode;
  canFetchMore?: boolean;
  onGetMoreData: (offset: number) => void;
  className?: string;
}
function InfiniteScroll<
  T extends {
    id?: string | number;
  }
>({ data, renderItem, loader, canFetchMore = true, onGetMoreData, className }: InfiniteScrollProps<T>): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const endElementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const fetchData = () => {
    if (loading || !canFetchMore) return;
    setLoading(true);
    onGetMoreData(data.length);
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && canFetchMore) {
        fetchData();
      }
    });
    observerRef.current = observer;
    if (endElementRef.current) {
      observer.observe(endElementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [canFetchMore]);
  useEffect(() => {
    setLoading(false);
  }, [data]);
  return (
    <div className={`scroll-smooth ${className}`}>
      {data.map((item, index) => (
        <React.Fragment key={item.id ?? index}>{renderItem(item, index)}</React.Fragment>
      ))}
      <div ref={endElementRef}>{canFetchMore && loader}</div>
    </div>
  );
}
export default InfiniteScroll;
