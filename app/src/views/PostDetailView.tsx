import { useNavigate, useParams } from "react-router-dom";
import Feed from "@/components/feeds/Feed";
import FeedContainer from "@/components/feeds/FeedContainer";
import ShareInput from "@/components/feeds/ShareInput";
import { useEffect } from "react";
import api from "@/api";
import Feeds from "@/components/feeds/Feeds";
import { IPostApi } from "@/types/ApiTypes";
import useFeedDetailStore from "@/stores/feedDetailStore";

const PostDetailView = () => {
  const navigate = useNavigate();
  const store = useFeedDetailStore();
  const { postId } = useParams();

  const fetchPost = async (id: number) => {
    const data = await api.post.getPost(id);
    store.setRootPost(data);
  };

  const fetchPostReplies = async (parentId: number) => {
    const response = await api.post.getReplies(parentId);
    store.setPosts(response.data as IPostApi[]);
  };

  useEffect(() => {
    if (!postId) {
      navigate("/");
      return;
    }

    const id = parseInt(postId);
    fetchPost(id);
    fetchPostReplies(id);
  }, [postId]);

  if (!store.state.rootPost) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <FeedContainer>
          <Feed store={store} post={store.state.rootPost} autoView={false} />
          <ShareInput store={store} parent={store.state.rootPost} />
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

export default PostDetailView;
