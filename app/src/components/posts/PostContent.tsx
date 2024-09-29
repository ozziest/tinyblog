import { ExtendedPost } from "@/stores/posts";

interface Props {
  post: ExtendedPost;
}

const PostContent = ({ post }: Props) => {
  return <p className="pt-1">{post.content}</p>;
};

export default PostContent;
