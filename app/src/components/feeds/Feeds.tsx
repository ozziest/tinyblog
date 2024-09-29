import Feed from "./Feed";
import { IPostStore } from "@/stores/shared";

interface Props {
  store: IPostStore;
}

const Feeds = ({ store }: Props) => {
  return (
    <>
      {store.state.posts.map((post) => (
        <Feed key={post.id} post={post} store={store} />
      ))}
    </>
  );
};

export default Feeds;
