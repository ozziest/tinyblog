import { IPostApi } from "../../types/ApiTypes";
import Feed from "./Feed";

interface Props {
  posts: IPostApi[];
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
