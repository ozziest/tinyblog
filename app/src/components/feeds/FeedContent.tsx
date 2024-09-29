import { ExtendedPost } from "../../stores/postStore";

interface Props {
  post: ExtendedPost;
}

const FeedContent = ({ post }: Props) => {
  return <p className="pt-1">{post.content}</p>;
};

export default FeedContent;
