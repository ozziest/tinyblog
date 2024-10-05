import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import Button from "@/components/inputs/Button";
import Posts from "@/components/posts/Posts";
import { useProfilePostsStore } from "@/stores/postStore";
import { useEffect, useState } from "react";
import api from "@/api";
import Avatar from "@/components/user/Avatar";
import { IUserApi } from "@/types/ApiTypes";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import useAuthStore from "@/stores/authStore";

const ProfileView = () => {
  const store = useProfilePostsStore();
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState<IUserApi>();
  const authStore = useAuthStore();

  const fetch = async () => {
    if (!username) {
      return navigate("/");
    }

    const response = await api.user.findByUsername(username);
    const { data } = await response.json();
    if (data.length === 0) {
      return navigate("/404");
    }

    setUser(data[0]);
  };

  const fetchPosts = async (userId: number) => {
    store.setLoading(true);
    const response = await api.post.paginate({ userId });
    const { data } = await response.json();
    store.setPosts(data);
    store.setLoading(false);
  };

  const loadMore = async () => {
    if (store.state.hasMore) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.post.paginate({ userId: user?.id, minId });
      const { data } = await response.json();
      store.addMorePosts(data);
      store.setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (user) {
      const response = await api.user.follow(user?.id);
      const { id } = await response.json();
      setUser({
        ...user,
        following_id: id,
      });
      authStore.increase("stats_following");
    }
  };

  const handleUnfollow = async () => {
    if (user?.id && user.following_id) {
      await api.user.unfollow(user?.id, user.following_id);
      setUser({
        ...user,
        following_id: undefined,
      });
      authStore.decrease("stats_following");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetch();
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchPosts(user.id);
    }
  }, [user]);

  if (!user) {
    return;
  }

  const isMyself = user.id === authStore.state.user.id;

  return (
    <>
      <div className="bg-white sticky top-[44px] pt-4 z-50">
        <div className="flex gap-4 outline outline-neutral-700  rounded p-4 mb-1 justify-between ">
          <div>
            <Avatar user={user} size={20} />
          </div>
          <div className="flex-grow ">
            <h1 className="font-bold text-2xl">{user.name}</h1>
            <div className="text-neutral-600 font-semibold">@{username}</div>
            {user.bio && (
              <div className="pt-1 text-sm text-neutral-700">{user.bio}</div>
            )}
          </div>
          <div>
            {!isMyself && user.following_id && (
              <Button onClick={handleUnfollow} variant="secondary">
                Unfollow
              </Button>
            )}
            {!isMyself && !user.following_id && (
              <Button onClick={handleFollow}>Follow</Button>
            )}
          </div>
        </div>
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

export default ProfileView;
