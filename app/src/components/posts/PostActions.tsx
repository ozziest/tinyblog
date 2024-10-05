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

interface Props {
  store: IPostStore;
  post: ExtendedPost;
}

const PostActions = ({ store, post }: Props) => {
  const authStore = useAuthStore();

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

    const response = await api.post.share(post.id);
    if (response.status === 201) {
      console.log("here");
      store.share(post.id);
    }
  };

  return (
    <div className="flex gap-6 mt-2">
      <ActionButton
        icon={<LikeIcon size={20} />}
        count={post.stats_likes}
        isSelected={post.is_liked_by_you}
        onClick={handleLikeClick}
      />
      {authStore.state.user.username !== post.user.username && (
        <ActionButton
          icon={<ShareIcon size={20} />}
          count={post.stats_shares}
          isSelected={false}
          onClick={handleShareClick}
        />
      )}
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

export default PostActions;
