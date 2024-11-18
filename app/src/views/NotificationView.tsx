import api from "@/api";
import EmptyData from "@/components/layout/EmptyData";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import NotificationGroup from "@/components/notification/NotificationGroup";
import PostContainer from "@/components/posts/PostContainer";
import { useNotificationsStore } from "@/stores/notifications";
import { useEffect, useState } from "react";

const NotificationView = () => {
  const [isReady, setReady] = useState(false);
  const store = useNotificationsStore();

  const fetchNotifications = async () => {
    store.setLoading(true);
    let response = await api.notifications.paginate({});
    let data = await response.json();

    // If there is any data, we can set the store
    if (data.length > 0) {
      store.setItems(data);
    } else {
      response = await api.post.paginate({});
      data = await response.json();
      store.setItems(data);
    }

    setReady(true);
    store.setLoading(false);
  };

  const loadMore = async () => {
    if (store.state.hasMore && store.state.minId !== Infinity) {
      store.setLoading(true);
      const { minId } = store.state;
      const response = await api.notifications.paginate({ minId });
      const data = await response.json();
      store.addMoreItems(data);
      store.setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl py-5">Notifications</h1>
      <PostContainer>
        {isReady && store.state.items.length === 0 && (
          <EmptyData
            title="Introvert detection!"
            description="You don't have a notification yet! Let's try to connect people."
          />
        )}
        {store.state.items.map((item) => (
          <NotificationGroup notification={item} key={item.id} />
        ))}
      </PostContainer>
      <InfiniteScroll isLoading={store.state.isLoading} loadMore={loadMore} />
    </>
  );
};

export default NotificationView;
