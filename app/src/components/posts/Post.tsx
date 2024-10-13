import PostContent from "./PostContent";
import PostArticle from "./PostArticle";
import PostActions from "./PostActions";
import PostAuthor from "./PostAuthor";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import PostRepliedToText from "./PostRepliedToText";
import PostReshare from "./PostReshare";
import { useState } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
  autoView?: boolean;
}

const Post = ({ store, post, autoView = true }: Props) => {
  const root: ExtendedPost = post.reshare || post;
  const [timer, setTimer] = useState<number | undefined>();
  const navigate = useNavigate();

  const setAsViewed = async () => {
    // We don't need to send another request
    if (post.isViewed || autoView === false) {
      return;
    }

    const response = await api.post.setViewed(post.id);
    const data = await response.json();
    store.setViewed(post.id, data.isAlreadyViewed);
  };

  const hadleMouseEnter = () => {
    // We don't need to set a timer
    if (post.isViewed || autoView === false) {
      return;
    }

    // Set a timer to set as viewed
    setTimer(window.setTimeout(setAsViewed, 1000));
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  const handleClick = () => {
    navigate(`/${post.id}`);
  };

  return (
    <div className="flex flex-col">
      {root.parent && (
        <>
          <PostRepliedToText post={root.parent} />

          <PostArticle
            post={root.parent}
            isParent
            hadleMouseEnter={hadleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
          >
            <PostAuthor post={root.parent} />
            <PostContent post={root.parent} />
            <PostActions store={store} post={root.parent} />
          </PostArticle>
        </>
      )}

      <PostArticle
        post={root}
        showBorder
        hadleMouseEnter={hadleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleClick={handleClick}
      >
        <PostAuthor post={root} />
        <PostContent post={root} />
        {post.reshare && <PostReshare post={post} />}
        <PostActions store={store} post={root} />
      </PostArticle>
    </div>
  );
};

export default Post;
