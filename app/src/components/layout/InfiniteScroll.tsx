import { useCallback, useEffect } from "react";
import throttle from "lodash/throttle"; // Import the throttle function from lodash
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  isLoading: boolean;
  loadMore: () => void;
}

const InfiniteScroll = ({ isLoading, loadMore }: Props) => {
  const throttledOnLoadMore = useCallback(throttle(loadMore, 3000), [
    isLoading,
  ]);

  // Infinite scroll detection
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300 &&
      !isLoading
    ) {
      throttledOnLoadMore();
    }
  }, [isLoading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return <div>{isLoading && <LoadingSpinner />}</div>;
};

export default InfiniteScroll;
