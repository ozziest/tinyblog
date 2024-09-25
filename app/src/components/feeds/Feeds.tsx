/* eslint-disable @typescript-eslint/no-explicit-any */

import { IFeed } from "../../interfaces";
import Feed from "./Feed";

const Feeds = ({ posts }: { posts: IFeed[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feeds;
