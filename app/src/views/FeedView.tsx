import { useNavigate, useParams } from "react-router-dom";
import Feed from "@/components/feeds/Feed";
import FeedContainer from "@/components/feeds/FeedContainer";
import ShareInput from "@/components/feeds/ShareInput";
import { useEffect } from "react";
import api from "@/api";
import Feeds from "@/components/feeds/Feeds";
import { IPostApi } from "@/types/ApiTypes";
import useFeedDetailStore from "@/stores/feedDetailStore";

const FeedView = () => {
  const navigate = useNavigate();
  const store = useFeedDetailStore();
  const { feedId } = useParams();

  const fetchData = async (id: number) => {
    const data = await api.post.getPost(id);
    store.setRootFeed(data);
  };

  const fetchDetails = async (parentId: number) => {
    const response = await api.post.getReplies(parentId);
    store.setFeeds(response.data as IPostApi[]);
  };

  useEffect(() => {
    if (!feedId) {
      navigate("/");
      return;
    }

    const id = parseInt(feedId);
    fetchData(id);
    fetchDetails(id);
  }, [feedId]);

  if (!store.state.rootFeed) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <FeedContainer>
          <Feed store={store} post={store.state.rootFeed} autoView={false} />
          <ShareInput store={store} parent={store.state.rootFeed} />
        </FeedContainer>
      </div>
      <div className="">
        <FeedContainer>
          <Feeds store={store} />
        </FeedContainer>
      </div>
    </>
  );
};

export default FeedView;
