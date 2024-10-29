import { IPostStore } from "@/stores/postStore";
import Post from "./Post";

interface Props {
  store: IPostStore;
}

const Posts = ({ store }: Props) => {
  const notRootPosts = store.state.posts.filter((item) => !item.isRootPost);

  return (
    <>
      {notRootPosts.map((post) => (
        <Post key={post.id} post={post} store={store} />
      ))}
    </>
  );
};

export default Posts;
