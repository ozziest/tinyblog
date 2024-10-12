import api from "@/api";
import NotificationGroup from "@/components/notification/NotificationGroup";
import { INotificationApi } from "@/types/ApiTypes";
import { useEffect, useState } from "react";

const NotificationView = () => {
  const [items, setItems] = useState<INotificationApi[]>([]);

  const fetchData = async () => {
    const response = await api.notifications.paginate();
    setItems(await response.json());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        {items.map((item) => (
          <NotificationGroup notification={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default NotificationView;
