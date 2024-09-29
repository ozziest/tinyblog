import { ExtendedPost } from "@/stores/postStore";

interface Props {
  post: ExtendedPost;
}

const PostContent = ({ post }: Props) => {
  return <p className="pt-1">{post.content}</p>;
};

export default PostContent;
