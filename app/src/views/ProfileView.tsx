import { useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import Posts from "@/components/posts/Posts";
import { useProfilePostsStore } from "@/stores/postStore";
import { useEffect } from "react";
import api from "@/api";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import UserProfileBox from "@/components/user/UserProfileBox";
import EmptyData from "@/components/layout/EmptyData";
import useUserDetail from "@/composables/useUserDetail";
import NotFound from "@/components/layout/NotFound";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import ServerError from "@/components/layout/ServerError";

const ProfileView = () => {
  const store = useProfilePostsStore();
  const { username } = useParams();
  const { loading, error, user, setUser, refetch } = useUserDetail(username);

  const fetchPosts = async (userId: number) => {
    store.setLoading(true);
    const response = await api.post.paginate({ userId });
    const data = await response.json();
    store.setPosts(data);
    store.setLoading(false);
  };

  const loadMore = async () => {
    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.post.paginate({ userId: user?.id, minId });
      const data = await response.json();
      store.addMorePosts(data);
      store.setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts(user.id);
    }
  }, [user]);

  if (error === "NotFound") {
    return <NotFound message="The user not found." />;
  }

  if (error === "Error") {
    return <ServerError />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const isEmptyData = store.state.posts.length == 0;

  return (
    <>
      <div className="bg-white sticky top-[50px] lg:top-[44px] pt-4 z-40">
        {user && (
          <UserProfileBox user={user} setUser={setUser} refetch={refetch} />
        )}
      </div>
      <div className="">
        <PostContainer>
          {isEmptyData && (
            <EmptyData
              title="No posts!"
              description="The user hasn't posted anything yet!"
            />
          )}
          {!isEmptyData && (
            <>
              <Posts store={store} />
              <InfiniteScroll store={store} loadMore={loadMore} />
            </>
          )}
        </PostContainer>
      </div>
    </>
  );
};

export default ProfileView;
