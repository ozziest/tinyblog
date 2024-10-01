import { IPostStore } from "@/stores/postStore";
import Post from "./Post";

interface Props {
  store: IPostStore;
}

// const generatePosts = (count: number) => {
//   return Array.from({ length: count }, (_, index) => ({
//     content: `This is a post #${index + 1} @iozguradem\n\nhttps://github.com/axe-api/axe-api\n\n#rest #tinyblog #content`,
//     usernames: ["@iozguradem"],
//     hashtags: ["#rest", "#tinyblog", "#content"],
//     links: [
//       {
//         link: "https://github.com/axe-api/axe-api",
//         uniqueId: `link-${index}`,
//       },
//     ],
//   }));
// };

// const posts = generatePosts(3);

const Posts = ({ store }: Props) => {
  const notRootPosts = store.state.posts.filter((item) => !item.isRootPost);

  return (
    <>
      {/* {posts.map((post, index) => (
        <FormatPostToJSX key={index} data={post} />
      ))} */}

      {notRootPosts.map((post) => (
        <Post key={post.id} post={post} store={store} />
      ))}
    </>
  );
};

export default Posts;
