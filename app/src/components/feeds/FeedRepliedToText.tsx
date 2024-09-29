import { ExtendedPost } from "../../stores/postStore";

interface Props {
  post: ExtendedPost;
}

const FeedRepliedToText = ({ post }: Props) => {
  return (
    <>
      {post.parent && (
        <div className="ml-[72px] text-neutral-500 text-sm py-[2px]">
          Replying to{" "}
          <span className="text-neutral-700">@{post.parent.user.username}</span>
        </div>
      )}
    </>
  );
};

export default FeedRepliedToText;
