import Avatar from "../user/Avatar";
import ActionButton from "./ActionButton";
import { Link, useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useState } from "react";
import usePostStore, { ExtendedPost } from "../../stores/postStore";
import api from "../../api";

interface Props {
  post: ExtendedPost;
}

const Feed = ({ post }: Props) => {
  const navigate = useNavigate();
  const postStore = usePostStore();
  const [timer, setTimer] = useState<number | undefined>();

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/u/${post.user.username}`);
  };

  const setAsViewed = () => {
    if (post.isViewed === false) {
      postStore.setViewed(post.id);
      api.post.setViewed(post.id);
    }
  };

  const hadleMouseEnter = () => {
    setTimer(setTimeout(setAsViewed, 1500));
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  return (
    <Link
      to={`/${post.id}`}
      className="p-4 border-b border-neutral-100 flex gap-2 justify-between transition-colors duration-300 hover:bg-neutral-50/50 last:border-none"
      onMouseEnter={hadleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Avatar user={post.user} />
      </div>
      <div className="flex-grow">
        <div className="flex gap-2 justify-between items-center">
          <button
            type="button"
            className="group text-neutral-600 font-semibold transition-colors duration-300 hover:text-neutral-950 flex gap-2 items-center"
            onClick={handleUserClick}
          >
            <span className=" group-hover:underline">{post.user.name}</span>
            <span className="text-neutral-400 text-sm">
              @{post.user.username}
            </span>
          </button>
          <div className="text-neutral-300 text-sm">
            {formatDistance(new Date(post.created_at), new Date())}
          </div>
        </div>
        <p className="pt-1">{post.content}</p>
        <div className="flex gap-4 pt-2">
          <ActionButton icon="♥" count={10} isSelected={false} />
          <ActionButton icon="📢" count={5} isSelected={true} />
        </div>
      </div>
    </Link>
  );
};

export default Feed;
