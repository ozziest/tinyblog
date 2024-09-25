import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import { getFeeds } from "../fakes";

const FAKE_FEEDS = getFeeds();

const FeedView = () => {
  return (
    <FeedContainer>
      <ShareInput />
      <Feeds posts={FAKE_FEEDS} />
    </FeedContainer>
  );
};

export default FeedView;
