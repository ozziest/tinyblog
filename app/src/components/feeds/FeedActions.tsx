import api from "../../api";
import usePostStore from "../../stores/postStore";
import { ExtendedPost } from "../../stores/shared";
import { LikeIcon, ReplyIcon, ShareIcon, ViewCountIcon } from "../Icons";
import ActionButton from "./ActionButton";

interface Props {
  post: ExtendedPost;
}

const FeedActions = ({ post }: Props) => {
  const postStore = usePostStore();

  const handleLikeClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await api.post.like(post.id);
    const { isAlreadyLiked } = await response.json();
    if (isAlreadyLiked) {
      postStore.unlike(post.id);
    } else {
      postStore.like(post.id);
    }
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex gap-6 mt-2">
      <ActionButton
        icon={<LikeIcon size={20} />}
        count={post.stats_likes}
        isSelected={post.is_liked_by_you}
        onClick={handleLikeClick}
      />
      <ActionButton
        icon={<ShareIcon size={20} />}
        count={post.stats_shares}
        isSelected={false}
        onClick={handleShareClick}
      />
      <ActionButton
        icon={<ReplyIcon size={20} />}
        count={post.stats_replies}
        isSelected={false}
        onClick={handleLikeClick}
      />
      <ActionButton
        icon={<ViewCountIcon size={20} />}
        count={post.stats_views}
        isSelected={false}
        onClick={handleLikeClick}
      />
    </div>
  );
};

export default FeedActions;
