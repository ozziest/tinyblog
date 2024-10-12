import api from "@/api";
import { useEffect, useState } from "react";

const NotificationView = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const response = await api.notifications.paginate();
    setItems(await response.json());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>{JSON.stringify(items)}</div>
    </>
  );
};

export default NotificationView;
