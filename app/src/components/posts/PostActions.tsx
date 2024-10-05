import api from "@/api";
import {
  LikeIcon,
  ReplyIcon,
  ShareIcon,
  ViewCountIcon,
} from "@/components/Icons";
import ActionButton from "./ActionButton";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
}

const PostActions = ({ store, post }: Props) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLikeClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await api.post.like(post.id);
    const { isAlreadyLiked } = await response.json();
    if (isAlreadyLiked) {
      store.unlike(post.id);
    } else {
      store.like(post.id);
    }
  };

  const handleShareClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!post.is_shared_by_you) {
      const response = await api.post.share(post.id);
      if (response.status === 201) {
        store.share(post.id);
      }
    } else {
      const response = await api.post.unshare(post.id);
      if (response.status === 201) {
        store.unshare(post.id, authStore.state.user.id);
      }
    }
  };

  const handleDetailClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/${post.id}`);
  };

  const isSharable = authStore.state.user.username !== post.user.username;

  return (
    <div className="flex gap-6 mt-2">
      <ActionButton
        icon={<LikeIcon size={20} />}
        count={post.stats_likes}
        isSelected={post.is_liked_by_you}
        onClick={handleLikeClick}
      />
      {isSharable && (
        <ActionButton
          icon={<ShareIcon size={20} />}
          count={post.stats_shares}
          isSelected={post.is_shared_by_you}
          onClick={handleShareClick}
        />
      )}
      <ActionButton
        icon={<ReplyIcon size={20} />}
        count={post.stats_replies}
        isSelected={false}
        onClick={handleDetailClick}
      />
      <ActionButton
        icon={<ViewCountIcon size={20} />}
        count={post.stats_views}
        isSelected={false}
        onClick={handleDetailClick}
      />
    </div>
  );
};

export default PostActions;
