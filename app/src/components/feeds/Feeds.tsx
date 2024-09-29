import { ExtendedPost } from "../../stores/postStore";
import Feed from "./Feed";

interface Props {
  posts: ExtendedPost[];
}

const Feeds = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feeds;
