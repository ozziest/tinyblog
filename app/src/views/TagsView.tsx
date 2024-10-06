import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import { useEffect, useState } from "react";
import api from "@/api";
import Posts from "@/components/posts/Posts";
import { useTagStore } from "@/stores/postStore";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import { IHashtagApi } from "@/types/ApiTypes";

const TagsView = () => {
  const navigate = useNavigate();
  const store = useTagStore();
  const { tag } = useParams();
  const [tagItem, setTagItem] = useState<IHashtagApi>();
  const initialTextState = `#${tag}`;

  const fetchTag = async () => {
    if (!tag) {
      navigate("/");
      return;
    }

    const response = await api.hashtag.findByTag(tag);
    if (response.status !== 200) {
      navigate("/");
    }

    const [item] = await response.json();

    if (!item) {
      return navigate("/");
    }

    setTagItem(item);
  };

  const fetchPosts = async () => {
    store.setLoading(true);
    const response = await api.post.paginate({ tagId: tagItem?.id });
    const data = await response.json();
    store.setPosts(data);
    store.setLoading(false);
  };

  const loadMore = async () => {
    if (!tagItem) {
      navigate("/");
      return;
    }

    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.post.paginate({ tagId: tagItem.id, minId });
      const data = await response.json();
      store.addMorePosts(data);
      store.setLoading(false);
    }
  };

  useEffect(() => {
    fetchTag();
  }, [tag]);

  useEffect(() => {
    if (tagItem) {
      fetchPosts();
    }
  }, [tagItem]);

  if (!tagItem) {
    return null;
  }

  return (
    <>
      <div className="bg-white sticky top-[40px]">
        <PostContainer>
          <h1 className="text-neutral-900 font-bold text-2xl px-4 pt-6">
            {tagItem.hashtag}
          </h1>
          <ShareInput store={store} initialState={initialTextState} />
        </PostContainer>
      </div>
      <div className="">
        <PostContainer>
          <Posts store={store} />
          <InfiniteScroll store={store} loadMore={loadMore} />
        </PostContainer>
      </div>
    </>
  );
};

export default TagsView;
