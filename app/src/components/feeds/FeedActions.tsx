import api from "../../api";
import { ExtendedPost } from "../../stores/postStore";
import ActionButton from "./ActionButton";

interface Props {
  post: ExtendedPost;
}

const FeedActions = ({ post }: Props) => {
  const handleLikeClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await api.post.like(post.id);

    console.log(response);
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex gap-4 pt-2">
      <ActionButton
        icon="♥"
        count={post.stats_likes}
        isSelected={false}
        onClick={handleLikeClick}
      />
      <ActionButton
        icon="📢"
        count={post.stats_shares}
        isSelected={false}
        onClick={handleShareClick}
      />
    </div>
  );
};

export default FeedActions;
