import PostContent from "./PostContent";
import PostArticle from "./PostArticle";
import PostActions from "./PostActions";
import PostAuthor from "./PostAuthor";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import PostRepliedToText from "./PostRepliedToText";
import PostReshare from "./PostReshare";
import { useNavigate } from "react-router-dom";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
}

const Post = ({ store, post }: Props) => {
  const root: ExtendedPost = post.reshare || post;
  const navigate = useNavigate();

  const handleClick = (clickedPost?: ExtendedPost) => {
    if (!clickedPost) {
      return;
    }

    navigate(`/${clickedPost.id}`);
  };

  return (
    <div className="flex flex-col">
      {root.parent && (
        <>
          <PostRepliedToText post={root.parent} />

          <PostArticle
            post={root.parent}
            isParent
            handleClick={() => handleClick(root.parent)}
          >
            <PostAuthor post={root.parent} />
            <PostContent post={root.parent} />
            <PostActions store={store} post={root.parent} />
          </PostArticle>
        </>
      )}

      <PostArticle post={root} showBorder handleClick={() => handleClick(root)}>
        <PostAuthor post={root} />
        <PostContent post={root} />
        {post.reshare && <PostReshare post={post} />}
        <PostActions store={store} post={root} />
      </PostArticle>
    </div>
  );
};

export default Post;
