import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import { useEffect } from "react";
import api from "@/api";
import { IPostApi } from "@/types/ApiTypes";
import Post from "@/components/posts/Post";
import Posts from "@/components/posts/Posts";
import { useFeedDetailStore } from "@/stores/posts";

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
        <PostContainer>
          <Post store={store} post={store.state.rootPost} autoView={false} />
          <ShareInput store={store} parent={store.state.rootPost} />
        </PostContainer>
      </div>
      <div className="">
        <PostContainer>
          <Posts store={store} />
        </PostContainer>
      </div>
    </>
  );
};

export default PostDetailView;
