import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/feeds/Feed";
import FeedContainer from "../components/feeds/FeedContainer";
import ShareInput from "../components/feeds/ShareInput";
import { useEffect, useState } from "react";
import api from "../api";
import { ExtendedPost, extendPost, toExtendedPost } from "../stores/postStore";
import Feeds from "../components/feeds/Feeds";

const FeedView = () => {
  const navigate = useNavigate();
  const { feedId } = useParams();
  const [post, setPost] = useState<ExtendedPost>();
  const [replies, setReplies] = useState<ExtendedPost[]>([]);

  const fetchData = async (id: number) => {
    const data = await api.post.getPost(id);
    setPost(extendPost(data));
  };

  const fetchDetails = async (parentId: number) => {
    const data = await api.post.getReplies(parentId);
    setReplies(toExtendedPost(data.data));
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

  if (!post) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <FeedContainer>
          <Feed post={post} autoView={false} />
          <ShareInput parent={post} />
        </FeedContainer>
      </div>
      <div className="">
        <FeedContainer>
          <Feeds posts={replies} />
        </FeedContainer>
      </div>
    </>
  );
};

export default FeedView;
