import { ExtendedPost } from "@/stores/postStore";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  post: ExtendedPost;
}

const PostAuthor = ({ post }: Props) => {
  const navigate = useNavigate();

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${post.user.username}`);
  };

  return (
    <div className="flex gap-2 justify-between md:items-center">
      <button
        type="button"
        className="group text-neutral-600 font-semibold transition-colors duration-300 hover:text-neutral-950 flex flex-col md:flex-row md:gap-2 items-center flex-grow"
        onClick={handleUserClick}
      >
        <div className="group-hover:underline text-left w-full md:w-auto">
          {post.user.name}
        </div>
        <div className="text-neutral-400 text-sm font-medium text-left w-full md:w-auto">
          @{post.user.username}
        </div>
      </button>
      <div className="text-neutral-300 text-sm">
        {formatDistance(new Date(post.created_at), new Date())}
      </div>
    </div>
  );
};

export default PostAuthor;
