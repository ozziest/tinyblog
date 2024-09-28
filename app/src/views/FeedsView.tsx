import { useEffect } from "react";
import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import api from "../api";
import useFeedsStore from "../stores/feedsStore";

const FeedView = () => {
  const feedStore = useFeedsStore();

  const fetchFeeds = async () => {
    const response = await api.post.paginate();
    feedStore.init(response.data);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <FeedContainer>
      <ShareInput />
      <Feeds posts={feedStore.state.feeds} />
    </FeedContainer>
  );
};

export default FeedView;
