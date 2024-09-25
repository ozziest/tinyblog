import { IFeed } from "../../interfaces";
import Avatar from "../user/Avatar";
import ActionButton from "./ActionButton";
import { Link, useNavigate } from "react-router-dom";

const Feed = ({ post }: { post: IFeed }) => {
  const navigate = useNavigate();

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/u/iozguradem");
  };

  return (
    <Link
      to={`/${post.id}`}
      className="p-4 border-b border-neutral-100 flex gap-2 justify-between transition-colors duration-300 hover:bg-neutral-50/50 last:border-none"
    >
      <div>
        <Avatar src={post.avatar} />
      </div>
      <div className="flex-grow">
        <div className="flex gap-2 justify-between items-center">
          <button
            type="button"
            className="group text-neutral-600 font-semibold transition-colors duration-300 hover:text-neutral-950 flex gap-2 items-center"
            onClick={handleUserClick}
          >
            <span className=" group-hover:underline">Özgür Adem Işıklı</span>
            <span className="text-neutral-400 text-sm">@iozguradem</span>
          </button>
          <div className="text-neutral-300 text-sm">2 days ago</div>
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
