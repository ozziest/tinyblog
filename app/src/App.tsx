import router from "./router";
import { RouterProvider } from "react-router-dom";
import ErrorMessageComponent from "./components/messages/ErrorMessage";
import SuccessMessage from "./components/messages/SuccessMessage";
import { useEffect, useState } from "react";
import { interceptors } from "axe-api-client";
import useAuthStore from "./stores/authStore";

const App = () => {
  const [isReady, setReady] = useState(false);
  const authStore = useAuthStore();

  const prepare = async () => {
    interceptors.addRequest((request: RequestInit) => {
      // It should send the cookies on each requests
      request.credentials = "include";

      return request;
    });

    interceptors.addResponse((response: Response) => {
      if (response.status === 401) {
        authStore.logout();
        if (!response.url.includes("/api/v1/me")) {
          window.location.reload();
        }
        return response;
      }
      return response;
    });

    await authStore.check();

    setReady(true);
  };

  useEffect(() => {
    prepare();
  }, []);

  if (!isReady) {
    return;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ErrorMessageComponent />
      <SuccessMessage />
    </>
  );
};

export default App;
