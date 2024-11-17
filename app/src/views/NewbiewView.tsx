import api from "@/api";
import Button from "@/components/inputs/Button";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import Avatar from "@/components/user/Avatar";
import { PER_PAGE } from "@/consts";
import useAuthStore from "@/stores/authStore";
import { IUserApi } from "@/types/ApiTypes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const getMaxId = (users: IUserApi[]): number => {
  return users.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
};

export const getMinId = (users: IUserApi[]): number => {
  return users.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

const NewbiesView = () => {
  const authStore = useAuthStore();
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState<IUserApi[]>([]);
  const [minId, setMinId] = useState<number | undefined>();
  const [hasMore, setHashMore] = useState(true);

  const fetchData = async (minId?: number) => {
    setLoading(true);
    const response = await api.user.paginate(minId);
    setLoading(false);
    const { data } = await response.json();
    setHashMore(data.length >= PER_PAGE);
    setItems([...items, ...data]);
    setMinId(getMinId(data));
  };

  const handleFollow = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: IUserApi,
  ) => {
    event.preventDefault();
    if (user) {
      const response = await api.user.follow(user?.id);
      const { id } = await response.json();
      const newState = [...items].map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            following_id: id,
          };
        }
        return item;
      });
      setItems(newState);
    }
  };

  const handleUnfollow = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: IUserApi,
  ) => {
    event.preventDefault();
    if (user?.id && user.following_id) {
      await api.user.unfollow(user?.id, user.following_id);
      const newState = [...items].map((item) => {
        if (item.id === user.id) {
          return {
            ...item,
            following_id: undefined,
          };
        }
        return item;
      });
      setItems(newState);
    }
  };

  const loadMore = () => {
    if (hasMore && isLoading === false) {
      fetchData(minId);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const myId = authStore.state.user.id;

  return (
    <>
      <h1 className="font-bold text-xl py-5">Newbies</h1>
      <div className="flex flex-col border border-neutral-200 rounded">
        {items.map((item, index) => (
          <Link
            key={index}
            className="flex gap-5 border-b border-neutral-200 p-3 hover:bg-neutral-50 transition-colors"
            to={`/u/${item.username}`}
          >
            <Avatar user={item} />
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

      <InfiniteScroll isLoading={isLoading} loadMore={loadMore} />
    </>
  );
};

export default NewbiesView;
