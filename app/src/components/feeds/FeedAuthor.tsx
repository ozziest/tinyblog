import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ExtendedPost } from "../../stores/shared";

interface Props {
  post: ExtendedPost;
}

const FeedAuthor = ({ post }: Props) => {
  const navigate = useNavigate();

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${post.user.username}`);
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      <button
        type="button"
        className="group text-neutral-600 font-semibold transition-colors duration-300 hover:text-neutral-950 flex gap-2 items-center"
        onClick={handleUserClick}
      >
        <span className=" group-hover:underline">{post.user.name}</span>
        <span className="text-neutral-400 text-sm">@{post.user.username}</span>
      </button>
      <div className="text-neutral-300 text-sm">
        {formatDistance(new Date(post.created_at), new Date())}
      </div>
    </div>
  );
};

export default FeedAuthor;
