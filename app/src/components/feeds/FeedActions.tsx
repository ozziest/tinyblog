import { ExtendedPost } from "../../stores/postStore";
import ActionButton from "./ActionButton";

interface Props {
  post: ExtendedPost;
}

const FeedActions = ({ post }: Props) => {
  return (
    <div className="flex gap-4 pt-2">
      <ActionButton icon="♥" count={post.stats_likes} isSelected={false} />
      <ActionButton icon="📢" count={post.stats_shares} isSelected={false} />
    </div>
  );
};

export default FeedActions;
