import { useEffect } from "react";
import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import api from "../api";
import usePostStore from "../stores/postStore";

const FeedView = () => {
  const postStore = usePostStore();

  const fetchFeeds = async () => {
    const response = await api.post.paginate();
    postStore.init(response.data);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <FeedContainer>
      <ShareInput />
      <Feeds posts={postStore.state.feeds} />
    </FeedContainer>
  );
};

export default FeedView;
