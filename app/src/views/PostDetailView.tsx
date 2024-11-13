import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import api from "@/api";
import Post from "@/components/posts/Post";
import Posts from "@/components/posts/Posts";
import { usePostDetailStore } from "@/stores/postStore";
import { toExtendedPost } from "@/helpers/posts";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import usePostDetail from "@/composables/usePostDetail";
import NotFound from "@/components/layout/NotFound";
import ServerError from "@/components/layout/ServerError";

const PostDetailView = () => {
  const navigate = useNavigate();
  const store = usePostDetailStore();
  const { postId } = useParams();
  const { loading, error } = usePostDetail(store, postId);

  const loadMore = async () => {
    if (!postId) {
      navigate("/");
      return;
    }

    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const id = parseInt(postId);
      const response = await api.post.getReplies(id, store.state.minId);
      const data = await response.json();
      const items = toExtendedPost(data);
      store.addMoreExtendedPosts(items);
      store.setLoading(false);
    }
  };

  const rootPost = store.state.posts.find((item) => item.isRootPost);

  if (error === "NotFound") {
    return <NotFound message="The post is not found anymore." />;
  }

  if (error === "Error") {
    return <ServerError />;
  }

  if (!rootPost || loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <PostContainer>
          <Post store={store} post={rootPost} autoView={false} />
          <ShareInput
            store={store}
            parent={rootPost}
            showLocationChanger={false}
          />
        </PostContainer>
      </div>
      <div className="mb-20">
        <PostContainer>
          <Posts store={store} />
          <InfiniteScroll store={store} loadMore={loadMore} />
        </PostContainer>
      </div>
    </>
  );
};

export default PostDetailView;
