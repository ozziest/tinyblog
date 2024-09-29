import FeedAuthor from "./FeedAuthor";
import FeedContent from "./FeedContent";
import FeedActions from "./FeedActions";
import FeedArticle from "./FeedArticle";
import { ExtendedPost } from "../../stores/shared";

interface Props {
  post: ExtendedPost;
  autoView?: boolean;
}

const Feed = ({ post, autoView = true }: Props) => {
  return (
    <div className="flex flex-col">
      {post.parent && (
        <FeedArticle post={post.parent} autoView={autoView} isParent>
          <FeedAuthor post={post.parent} />
          <FeedContent post={post.parent} />
          <FeedActions post={post.parent} />
        </FeedArticle>
      )}

      <FeedArticle post={post} autoView={autoView} showBorder>
        <FeedAuthor post={post} />
        <FeedContent post={post} />
        <FeedActions post={post} />
      </FeedArticle>
    </div>
  );
};

export default Feed;
