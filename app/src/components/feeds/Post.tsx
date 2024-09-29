import FeedAuthor from "./FeedAuthor";
import FeedContent from "./FeedContent";
import FeedArticle from "./FeedArticle";
import { ExtendedPost, IPostStore } from "@/stores/shared";
import PostActions from "./PostActions";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
  autoView?: boolean;
}

const Post = ({ store, post, autoView = true }: Props) => {
  return (
    <div className="flex flex-col">
      {post.parent && (
        <FeedArticle
          store={store}
          post={post.parent}
          autoView={autoView}
          isParent
        >
          <FeedAuthor post={post.parent} />
          <FeedContent post={post.parent} />
          <PostActions store={store} post={post.parent} />
        </FeedArticle>
      )}

      <FeedArticle store={store} post={post} autoView={autoView} showBorder>
        <FeedAuthor post={post} />
        <FeedContent post={post} />
        <PostActions store={store} post={post} />
      </FeedArticle>
    </div>
  );
};

export default Post;
