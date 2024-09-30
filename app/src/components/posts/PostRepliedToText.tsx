import { ExtendedPost } from "@/stores/postStore";

interface Props {
  post: ExtendedPost;
}

const PostRepliedToText = ({ post }: Props) => {
  return (
    <>
      {post.parent && (
        <div className="ml-[72px] text-neutral-600 text-sm py-1 mt-1">
          Replying to{" "}
          <span className="text-neutral-800">@{post.parent.user.username}</span>
        </div>
      )}
    </>
  );
};

export default PostRepliedToText;
