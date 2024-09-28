/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPost } from "../../interfaces";
import Feed from "./Feed";

const Feeds = ({ posts }: { posts: IPost[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feeds;
