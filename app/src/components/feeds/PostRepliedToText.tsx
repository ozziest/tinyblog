import { ExtendedPost } from "@/stores/shared";

interface Props {
  post: ExtendedPost;
}

const PostRepliedToText = ({ post }: Props) => {
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

export default PostRepliedToText;
