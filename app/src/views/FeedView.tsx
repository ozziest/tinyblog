import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/feeds/Feed";
import FeedContainer from "../components/feeds/FeedContainer";
import ShareInput from "../components/feeds/ShareInput";
import { useEffect, useState } from "react";
import api from "../api";
import { ExtendedPost, extendPost } from "../stores/postStore";

const FeedView = () => {
  const navigate = useNavigate();
  const { feedId } = useParams();
  const [post, setPost] = useState<ExtendedPost>();

  const fetchData = async () => {
    if (!feedId) {
      navigate("/");
      return;
    }

    const data = await api.post.getPost(parseInt(feedId));
    setPost(extendPost(data));
  };

  useEffect(() => {
    fetchData();
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
          answers...
          {/* <Feeds posts={FAKE_ANSWERS} /> */}
        </FeedContainer>
      </div>
    </>
  );
};

export default FeedView;
