import api from "@/api";
import { IUserApi } from "@/types/ApiTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorTypes = "NotFound" | "Error";

const getError = (status: number): ErrorTypes | undefined => {
  if (status === 404) {
    return "NotFound";
  }

  if (status >= 500) {
    return "Error";
  }
};

const useUserDetail = (username: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorTypes>();
  const [user, setUser] = useState<IUserApi>();
  const navigate = useNavigate();

  const refetch = async () => {
    if (!username) {
      return navigate("/");
    }

    setError(undefined);
    setLoading(true);
    const response = await api.user.findByUsername(username);
    setLoading(false);
    const anyError = getError(response.status);

    if (anyError) {
      setError(anyError);
      return;
    }

    const data = await response.json();

    setUser(data);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    refetch();
  }, [username]);

  return { loading, error, user, setUser, refetch };
};

export default useUserDetail;
