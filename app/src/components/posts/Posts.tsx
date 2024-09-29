import { IPostStore } from "@/stores/shared";
import Post from "./Post";

interface Props {
  store: IPostStore;
}

const Posts = ({ store }: Props) => {
  return (
    <>
      {store.state.posts.map((post) => (
        <Post key={post.id} post={post} store={store} />
      ))}
    </>
  );
};

export default Posts;
