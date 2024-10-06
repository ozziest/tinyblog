import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import { useEffect } from "react";
import api from "@/api";
import Post from "@/components/posts/Post";
import Posts from "@/components/posts/Posts";
import { ExtendedPost, usePostDetailStore } from "@/stores/postStore";
import { toExtendedPost } from "@/helpers/posts";
import InfiniteScroll from "@/components/layout/InfiniteScroll";

const PostDetailView = () => {
  const navigate = useNavigate();
  const store = usePostDetailStore();
  const { postId } = useParams();

  const fetch = async () => {
    if (!postId) {
      navigate("/");
      return;
    }

    const id = parseInt(postId);

    // Fetching the parent post and the replies together
    const results = await Promise.all([
      api.post.getPost(id),
      api.post.getReplies(id),
    ]);

    // Create the extended post array all together
    const [postResponse, repliesResponse] = results;
    const post = await postResponse.json();
    const replies = await repliesResponse.json();
    const items: ExtendedPost[] = toExtendedPost([post, ...replies]);

    // The first post should be the root post
    if (items.length > 0) {
      items[0].isRootPost = true;
    }

    // Set the post on the store
    store.setExtendedPosts(items);
  };

  const loadMore = async () => {
    if (!postId) {
      navigate("/");
      return;
    }

    if (store.state.hasMore) {
      store.setLoading(true);
      const id = parseInt(postId);
      const response = await api.post.getReplies(id, store.state.minId);
      const data = await response.json();
      const items = toExtendedPost(data);
      store.addMoreExtendedPosts(items);
      store.setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [postId]);

  const rootPost = store.state.posts.find((item) => item.isRootPost);

  if (!rootPost) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <PostContainer>
          <Post store={store} post={rootPost} autoView={false} />
          <ShareInput store={store} parent={rootPost} />
        </PostContainer>
      </div>
      <div className="">
        <PostContainer>
          <Posts store={store} />
          <InfiniteScroll store={store} loadMore={loadMore} />
        </PostContainer>
      </div>
    </>
  );
};

export default PostDetailView;
