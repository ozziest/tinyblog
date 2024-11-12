import { useEffect, useRef } from "react";
import api from "@/api";
import PostContainer from "@/components/posts/PostContainer";
import Posts from "@/components/posts/Posts";
import { useDashboardStore } from "@/stores/postStore";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import StickyShareInput from "@/components/posts/StickyShareInput";
import MobileShareButton from "@/components/posts/MobileShareButton";
import useAuthStore from "@/stores/authStore";
import { throttle } from "lodash";

const DashboardView = () => {
  const store = useDashboardStore();
  const authStore = useAuthStore();

  const fetchPosts = async () => {
    store.setLoading(true);
    let response = await api.post.paginate({
      feed: true,
      locations: authStore.getFeedLocations(),
    });
    let data = await response.json();

    // If there is any data, we can set the store
    if (data.length > 0) {
      store.setPosts(data);
      store.setLoading(false);
    } else {
      // Otherwise, that means the user doesn't follow anyone. In that case
      // we can fetch just the latest posts.
      response = await api.post.paginate();
      data = await response.json();
      store.setPosts(data);
      store.setLoading(false);
    }
  };

  const loadMore = async () => {
    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.post.paginate({
        feed: true,
        locations: authStore.getFeedLocations(),
        minId,
      });
      const data = await response.json();
      store.addMorePosts(data);
      store.setLoading(false);
    }
  };

  const throttledFetchPosts = useRef(
    throttle(fetchPosts, 300, { leading: false, trailing: true }),
  );

  useEffect(() => {
    throttledFetchPosts.current();
  }, [authStore.state.user.locations]);

  useEffect(() => {
    throttledFetchPosts.current();
  }, []);

  return (
    <PostContainer>
      <StickyShareInput store={store} />
      <MobileShareButton store={store} />
      <Posts store={store} />
      <InfiniteScroll store={store} loadMore={loadMore} />
    </PostContainer>
  );
};

export default DashboardView;
