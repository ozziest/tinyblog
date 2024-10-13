import React from "react";
import Avatar from "@/components/user/Avatar";
import classNames from "classnames";
import { ExtendedPost } from "@/stores/postStore";

interface Props {
  post: ExtendedPost;
  showBorder?: boolean;
  isParent?: boolean;
  children: React.ReactNode;
  hadleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  handleClick?: () => void;
}

const PostArticle = ({
  post,
  showBorder,
  isParent,
  children,
  hadleMouseEnter,
  handleMouseLeave,
  handleClick,
}: Props) => {
  return (
    <>
      <article
        className={classNames(
          "p-4 flex gap-2 justify-between duration-300 cursor-pointer transition-all hover:bg-neutral-50",
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
            <div className="bg-neutral-100 h-full w-[3px] rounded mt-1 -mb-[28px] z-10"></div>
          )}
        </div>
        <div className="flex-grow">{children}</div>
      </article>
    </>
  );
};

export default PostArticle;
