import api from "@/api";
import { PER_PAGE } from "@/consts";
import { IUserApi } from "@/types/ApiTypes";
import { useEffect, useState } from "react";

type ErrorTypes = "NotFound" | "Error";

const getError = (status: number): ErrorTypes | undefined => {
  if (status === 404) {
    return "NotFound";
  }

  if (status >= 500) {
    return "Error";
  }
};

const getMinId = (users: IUserApi[]): number => {
  return users.reduce((min, obj) => {
    return obj.id < min ? obj.id : min;
  }, Infinity);
};

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorTypes>();
  const [items, setItems] = useState<IUserApi[]>([]);
  const [minId, setMinId] = useState<number | undefined>();
  const [hasMore, setHashMore] = useState(true);

  const refetch = async () => {
    setError(undefined);
    setLoading(true);
    const response = await api.user.paginate(minId);
    setLoading(false);

    const anyError = getError(response.status);

    if (anyError) {
      setError(anyError);
      return;
    }

    const { data } = await response.json();
    setHashMore(data.length >= PER_PAGE);
    setItems([...items, ...data]);
    setMinId(getMinId(data));
  };

  useEffect(() => {
    refetch();
  }, []);

  const loadMore = () => {
    if (hasMore && loading === false) {
      refetch();
    }
  };

  return { loading, error, items, setItems, refetch, loadMore };
};

export default useUsers;
