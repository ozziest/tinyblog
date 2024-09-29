import PostContent from "./PostContent";
import PostArticle from "./PostArticle";
import { ExtendedPost, IPostStore } from "@/stores/shared";
import PostActions from "./PostActions";
import PostAuthor from "./PostAuthor";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
  autoView?: boolean;
}

const Post = ({ store, post, autoView = true }: Props) => {
  return (
    <div className="flex flex-col">
      {post.parent && (
        <PostArticle
          store={store}
          post={post.parent}
          autoView={autoView}
          isParent
        >
          <PostAuthor post={post.parent} />
          <PostContent post={post.parent} />
          <PostActions store={store} post={post.parent} />
        </PostArticle>
      )}

      <PostArticle store={store} post={post} autoView={autoView} showBorder>
        <PostAuthor post={post} />
        <PostContent post={post} />
        <PostActions store={store} post={post} />
      </PostArticle>
    </div>
  );
};

export default Post;
