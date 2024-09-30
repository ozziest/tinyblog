import useAuthStore from "@/stores/authStore";
import { ExtendedPost } from "@/stores/postStore";

interface Props {
  post: ExtendedPost;
}

const PostReshare = ({ post }: Props) => {
  const authStore = useAuthStore();

  let shareUser = `@${post.user.username}`;

  if (post.user.username === authStore.state.user.username) {
    shareUser = "You";
  }

  return (
    <div className="py-2 text-neutral-500 font-bold text-sm">
      {shareUser} reshared this!
    </div>
  );
};

export default PostReshare;
