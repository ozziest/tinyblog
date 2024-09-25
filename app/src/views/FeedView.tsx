import { useParams } from "react-router-dom";
import Feed from "../components/feeds/Feed";
import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import { getFeed, getFeeds } from "../fakes";

const FeedView = () => {
  const { feedId } = useParams();
  const FAKE_FEED = getFeed(parseInt(feedId || "0"));
  const FAKE_ANSWERS = getFeeds().reverse();

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <FeedContainer>
          <Feed post={FAKE_FEED} />
          <ShareInput isReply />
        </FeedContainer>
      </div>
      <div className="">
        <FeedContainer>
          <Feeds posts={FAKE_ANSWERS} />
        </FeedContainer>
      </div>
    </>
  );
};

export default FeedView;
