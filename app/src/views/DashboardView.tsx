import { useEffect } from "react";
import ShareInput from "@/components/posts/ShareInput";
import api from "@/api";
import PostContainer from "@/components/posts/PostContainer";
import Posts from "@/components/posts/Posts";
import { useDashboardStore } from "@/stores/posts";

const DashboardView = () => {
  const store = useDashboardStore();

  const fetchPosts = async () => {
    const response = await api.post.paginate();
    store.setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContainer>
      <ShareInput store={store} />
      <Posts store={store} />
    </PostContainer>
  );
};

export default DashboardView;
