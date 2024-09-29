import React, { useState } from "react";
import usePostStore, { ExtendedPost } from "../../stores/postStore";
import Avatar from "../user/Avatar";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import classNames from "classnames";

interface Props {
  post: ExtendedPost;
  autoView?: boolean;
  showBorder?: boolean;
  isParent?: boolean;
  children: React.ReactNode;
}

const FeedArticle = ({
  post,
  autoView,
  showBorder,
  isParent,
  children,
}: Props) => {
  const navigate = useNavigate();
  const postStore = usePostStore();
  const [timer, setTimer] = useState<number | undefined>();

  const setAsViewed = async () => {
    // We don't need to send another request
    if (post.isViewed || autoView === false) {
      return;
    }

    const response = await api.post.setViewed(post.id);
    const data = await response.json();
    postStore.setViewed(post.id, data.isAlreadyViewed);
  };

  const hadleMouseEnter = () => {
    // We don't need to set a timer
    if (post.isViewed || autoView === false) {
      return;
    }

    // Set a timer to set as viewed
    setTimer(setTimeout(setAsViewed, 1000));
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  const handleClick = () => {
    navigate(`/${post.id}`);
  };

  return (
    <>
      {post.parent && (
        <div className="ml-[72px] text-neutral-500 text-sm py-[2px]">
          Replying to{" "}
          <span className="text-neutral-800">@{post.parent.user.username}</span>
        </div>
      )}
      <article
        className={classNames(
          "p-4 flex gap-2 justify-between transition-colors duration-300 hover:bg-neutral-50 cursor-pointer",
          {
            "border-b border-neutral-200": showBorder,
          },
        )}
        onMouseEnter={hadleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
          <Avatar user={post.user} />
          {isParent && (
            <div className="bg-neutral-100 h-full w-[3px] rounded mt-1 -mb-[300px] z-10"></div>
          )}
        </div>
        <div className="flex-grow">{children}</div>
      </article>
    </>
  );
};

export default FeedArticle;
