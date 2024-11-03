import api from "@/api";
import { toExtendedPost } from "@/helpers/posts";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorTypes = "NotFound" | "Error";

const getError = (status: number): ErrorTypes | undefined => {
  if (status === 404) {
    return "NotFound";
  }

  if (status >= 500) {
    return "Error";
  }
};

const usePostDetail = (store: IPostStore, postId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorTypes>();
  const navigate = useNavigate();

  const fetch = async () => {
    if (!postId) {
      navigate("/");
      return;
    }

    setLoading(true);
    const id = parseInt(postId);

    // Fetching the parent post and the replies together
    const results = await Promise.all([
      api.post.getPost(id),
      api.post.getReplies(id),
    ]);
    setLoading(false);

    // Create the extended post array all together
    const [postResponse, repliesResponse] = results;

    const { status: postStatus } = postResponse;
    const { status: repliesStatus } = repliesResponse;

    const anyError = getError(postStatus) || getError(repliesStatus);
    if (anyError) {
      setError(anyError);
      return;
    }

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

  useEffect(() => {
    fetch();
  }, [postId]);

  return { loading, error };
};

export default usePostDetail;
