import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import { useEffect, useState } from "react";
import api from "@/api";
import Posts from "@/components/posts/Posts";
import { useTagStore } from "@/stores/postStore";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import { IHashtagApi } from "@/types/ApiTypes";
import EmptyData from "@/components/layout/EmptyData";

const TagsView = () => {
  const navigate = useNavigate();
  const store = useTagStore();
  const { tag } = useParams();
  const [tagItem, setTagItem] = useState<IHashtagApi>();
  const initialTextState = `#${tag}`;

  const getTheDefinedTag = async () => {
    if (!tag) {
      return null;
    }

    const response = await api.hashtag.findByTag(tag);
    if (response.status !== 200) {
      return null;
    }

    const [item] = await response.json();

    if (!item) {
      return null;
    }

    return item;
  };

  const createANewTag = async () => {
    if (!tag) {
      return null;
    }

    const response = await api.hashtag.create(tag);

    if ([200, 201].includes(response.status) === false) {
      return navigate("/");
    }

    return await response.json();
  };

  const fetchTag = async () => {
    let item = await getTheDefinedTag();

    if (!item) {
      item = await createANewTag();
    }

    if (!item) {
      navigate("/");
      return;
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

  const isEmptyData = store.state.posts.length == 0;

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
          {isEmptyData && (
            <EmptyData
              title="Be the first!"
              description="Nothing has been posted with this hashtag yet. Would you like to start a discussion?"
            />
          )}

          {!isEmptyData && (
            <>
              <Posts store={store} />
              <InfiniteScroll
                isLoading={store.state.isLoading}
                loadMore={loadMore}
              />
            </>
          )}
        </PostContainer>
      </div>
    </>
  );
};

export default TagsView;
