import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import Posts from "@/components/posts/Posts";
import { useProfilePostsStore } from "@/stores/postStore";
import { useEffect, useState } from "react";
import api from "@/api";
import { IUserApi } from "@/types/ApiTypes";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import UserProfileBox from "@/components/user/UserProfileBox";

const ProfileView = () => {
  const store = useProfilePostsStore();
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState<IUserApi>();

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

  return (
    <>
      <div className="bg-white sticky top-[44px] pt-4 z-50">
        <UserProfileBox user={user} setUser={setUser} />
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
