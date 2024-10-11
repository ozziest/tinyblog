import { useCallback, useEffect } from "react";
import throttle from "lodash/throttle"; // Import the throttle function from lodash
import { IPostStore } from "@/stores/postStore";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  store: IPostStore;
  loadMore: () => void;
}

const InfiniteScroll = ({ store, loadMore }: Props) => {
  const throttledOnLoadMore = useCallback(throttle(loadMore, 3000), [store]);

  // Infinite scroll detection
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300 &&
      !store.state.isLoading
    ) {
      throttledOnLoadMore();
    }
  }, [store, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return <div>{store.state.isLoading && <LoadingSpinner />}</div>;
};

export default InfiniteScroll;
