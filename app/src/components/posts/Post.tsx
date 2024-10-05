import PostContent from "./PostContent";
import PostArticle from "./PostArticle";
import PostActions from "./PostActions";
import PostAuthor from "./PostAuthor";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import PostRepliedToText from "./PostRepliedToText";
import PostReshare from "./PostReshare";

interface Props {
  store: IPostStore;
  post: ExtendedPost;
  autoView?: boolean;
}

const Post = ({ store, post, autoView = true }: Props) => {
  const root: ExtendedPost = post.reshare || post;

  return (
    <div className="flex flex-col">
      {root.parent && (
        <>
          <PostRepliedToText post={root.parent} />

          <PostArticle
            store={store}
            post={root.parent}
            autoView={autoView}
            isParent
          >
            <PostAuthor post={root.parent} />
            <PostContent post={root.parent} />
            <PostActions store={store} post={root.parent} />
          </PostArticle>
        </>
      )}

      <PostArticle store={store} post={root} autoView={autoView} showBorder>
        <PostAuthor post={root} />
        <PostContent post={root} />
        {post.reshare && <PostReshare post={post} />}
        <PostActions store={store} post={root} reshare={post.reshare} />
      </PostArticle>
    </div>
  );
};

export default Post;
