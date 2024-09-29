import { useEffect } from "react";
import FeedContainer from "@/components/feeds/FeedContainer";
import Feeds from "@/components/feeds/Feeds";
import ShareInput from "@/components/feeds/ShareInput";
import api from "@/api";
import useDashboardStore from "@/stores/dashboardStore";

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
    <FeedContainer>
      <ShareInput store={store} />
      <Feeds store={store} />
    </FeedContainer>
  );
};

export default DashboardView;
