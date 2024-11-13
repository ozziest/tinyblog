import { LOCATION_TITLES } from "@/consts";
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
      <div className="text-neutral-600 font-semibold flex flex-col md:flex-row md:gap-2 items-center flex-grow">
        <div className="text-left w-full md:w-auto">
          <button
            type="button"
            onClick={handleUserClick}
            className="transition-colors hover:text-neutral-950 hover:underline"
          >
            {post.user.name}
          </button>
        </div>
        <div className="text-neutral-400 text-sm font-medium text-left w-full md:w-auto">
          <button
            type="button"
            onClick={handleUserClick}
            className="transition-colors hover:text-neutral-950 hover:underline"
          >
            @{post.user.username}
          </button>
        </div>
      </div>
      <div className="text-neutral-300 text-sm grow text-right">
        {formatDistance(new Date(post.created_at), new Date())} -{" "}
        <span title={LOCATION_TITLES[post.location]}>{post.location}</span>
      </div>
    </div>
  );
};

export default PostAuthor;
