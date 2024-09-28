import { useEffect, useState } from "react";
import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import api from "../api";
import { IPagination } from "axe-api-client";
import { IPost } from "../interfaces";

const FeedView = () => {
  const [pagination, setPagination] = useState<IPagination>();

  const fetchFeeds = async () => {
    const response = await api.post.paginate();
    setPagination(response);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const items: IPost[] = pagination?.data || [];

  return (
    <FeedContainer>
      <ShareInput />
      <Feeds posts={items} />
    </FeedContainer>
  );
};

export default FeedView;
