import Feed from "./Feed";
import { ViewTypes } from "../../enums";
import { ExtendedPost } from "../../stores/shared";

interface Props {
  viewType: ViewTypes;
  posts: ExtendedPost[];
}

const Feeds = ({ viewType, posts }: Props) => {
  console.log("FeedView", viewType);

  return (
    <>
      {posts.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feeds;
