import { useEffect } from "react";
import FeedContainer from "@/components/feeds/FeedContainer";
import Feeds from "@/components/feeds/Feeds";
import ShareInput from "@/components/feeds/ShareInput";
import api from "@/api";
import useDashboardStore from "@/stores/dashboardStore";

const FeedView = () => {
  const store = useDashboardStore();

  const fetchFeeds = async () => {
    const response = await api.post.paginate();
    store.setFeeds(response.data);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <FeedContainer>
      <ShareInput store={store} />
      <Feeds store={store} />
    </FeedContainer>
  );
};

export default FeedView;
