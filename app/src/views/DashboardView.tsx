import { useEffect } from "react";
import Feeds from "@/components/feeds/Feeds";
import ShareInput from "@/components/feeds/ShareInput";
import api from "@/api";
import useDashboardStore from "@/stores/dashboardStore";
import PostContainer from "@/components/feeds/PostContainer";

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
      <Feeds store={store} />
    </PostContainer>
  );
};

export default DashboardView;
