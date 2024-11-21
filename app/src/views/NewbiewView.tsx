import api from "@/api";
import Button from "@/components/inputs/Button";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import Avatar from "@/components/user/Avatar";
import useAuthStore from "@/stores/authStore";
import { useNewbiesStore } from "@/stores/userStore";
import { IUserApi } from "@/types/ApiTypes";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const NewbiesView = () => {
  const authStore = useAuthStore();
  const store = useNewbiesStore();
  const navigate = useNavigate();

  const handleFollow = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: IUserApi,
  ) => {
    event.preventDefault();
    if (user) {
      const response = await api.user.follow(user?.id);
      const { id } = await response.json();
      const newState = [...store.state.users].map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            following_id: id,
          };
        }
        return item;
      });
      store.setUsers(newState);
    }
  };

  const handleUnfollow = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: IUserApi,
  ) => {
    event.preventDefault();
    if (user?.id && user.following_id) {
      await api.user.unfollow(user?.id, user.following_id);
      const newState = [...store.state.users].map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            following_id: undefined,
          };
        }
        return item;
      });
      store.setUsers(newState);
    }
  };

  const fetchUsers = async () => {
    store.setLoading(true);
    let response = await api.user.paginate({});
    let data = await response.json();

    // If there is any data, we can set the store
    if (data.length > 0) {
      store.setUsers(data);
    } else {
      response = await api.post.paginate();
      data = await response.json();
      store.setUsers(data);
    }

    store.setLoading(false);
  };

  useEffect(() => {
    if (!authStore.state.isLoggedIn) {
      navigate("/");
      return;
    }

    fetchUsers();
  }, []);

  const loadMore = async () => {
    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.user.paginate({ minId });
      const data = await response.json();
      store.addMoreUsers(data);
      store.setLoading(false);
    }
  };

  const myId = authStore.state.user.id;

  return (
    <>
      <Helmet>
        <title>Newbies - tinyblog.space</title>
      </Helmet>

      <h1 className="font-bold text-xl py-5">Newbies</h1>
      <div className="flex flex-col border border-neutral-200 rounded">
        {store.state.users.map((item, index) => (
          <Link
            key={index}
            className="flex gap-5 border-b border-neutral-200 p-3 hover:bg-neutral-50 transition-colors"
            to={`/u/${item.username}`}
          >
            <Avatar src={item.avatar} />
            <div className="flex flex-col justify-center flex-grow">
              <div className="font-semibold text-lg flex items-center gap-1">
                {item.name}
                <span className="text-sm text-neutral-600">
                  @{item.username}
                </span>
              </div>
              <div>{item.bio}</div>
            </div>
            <div>
              {myId !== item.id && item.following_id && (
                <Button
                  onClick={(event) => handleUnfollow(event, item)}
                  variant="secondary"
                >
                  Unfollow
                </Button>
              )}
              {myId !== item.id && !item.following_id && (
                <Button onClick={(event) => handleFollow(event, item)}>
                  Follow
                </Button>
              )}
            </div>
          </Link>
        ))}
      </div>

      <InfiniteScroll isLoading={store.state.isLoading} loadMore={loadMore} />
    </>
  );
};

export default NewbiesView;
