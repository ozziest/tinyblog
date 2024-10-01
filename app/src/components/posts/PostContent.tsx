import { ExtendedPost } from "@/stores/postStore";
import FormatPostToJSX from "./FormatPostToJSX";

interface Props {
  post: ExtendedPost;
}

const PostContent = ({ post }: Props) => {
  return (
    <p className="pt-1">
      <FormatPostToJSX data={post} />
    </p>
  );
};

export default PostContent;
