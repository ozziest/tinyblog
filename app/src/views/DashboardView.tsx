import { useEffect } from "react";
import ShareInput from "@/components/posts/ShareInput";
import api from "@/api";
import PostContainer from "@/components/posts/PostContainer";
import Posts from "@/components/posts/Posts";
import { useDashboardStore } from "@/stores/postStore";
import InfiniteScroll from "@/components/layout/InfiniteScroll";

const DashboardView = () => {
  const store = useDashboardStore();

  const fetchPosts = async () => {
    store.setLoading(true);
    const response = await api.post.paginate({ feed: true });
    const data = await response.json();
    store.setPosts(data);
    store.setLoading(false);
  };

  const loadMore = async () => {
    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.post.paginate({ feed: true, minId });
      const data = await response.json();
      store.addMorePosts(data);
      store.setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContainer>
      <ShareInput store={store} />
      <Posts store={store} />
      <InfiniteScroll store={store} loadMore={loadMore} />
    </PostContainer>
  );
};

export default DashboardView;
