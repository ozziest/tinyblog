import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/feeds/Feed";
import FeedContainer from "../components/feeds/FeedContainer";
import ShareInput from "../components/feeds/ShareInput";
import { useEffect, useState } from "react";
import api from "../api";
import { ExtendedPost } from "../stores/postStore";
import Feeds from "../components/feeds/Feeds";
import { extendPost, resolvePosts } from "../helpers/posts";
import { IPostApi } from "../types/ApiTypes";
import { IResolvedList } from "../interfaces";

const FeedView = () => {
  const navigate = useNavigate();
  const { feedId } = useParams();
  const [post, setPost] = useState<ExtendedPost>();
  const [replies, setReplies] = useState<IResolvedList<ExtendedPost>>();

  const fetchData = async (id: number) => {
    const data = await api.post.getPost(id);
    setPost(extendPost(data));
  };

  const fetchDetails = async (parentId: number) => {
    const response = await api.post.getReplies(parentId);
    const data = resolvePosts(response.data as IPostApi[]);
    setReplies(data);
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

  if (!post || !replies) {
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
          <Feeds posts={replies.items} />
        </FeedContainer>
      </div>
    </>
  );
};

export default FeedView;
