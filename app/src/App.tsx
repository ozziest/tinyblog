import router from "./router";
import { RouterProvider } from "react-router-dom";
import ErrorMessageComponent from "./components/messages/ErrorMessage";
import SuccessMessage from "./components/messages/SuccessMessage";
import { useEffect, useState } from "react";
import { interceptors } from "axe-api-client";
import useAuthStore from "./stores/authStore";
import LoadingModal from "./components/messages/LoadingModal";

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

  const addServices = () => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/services/notification.js").then(
        () => {
          console.log("Notification Service is registered");
        },
        (error) => {
          console.log("ServiceWorker registration failed: ", error);
        },
      );
    });
  };

  useEffect(() => {
    prepare();
    addServices();
  }, []);

  if (!isReady) {
    return;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ErrorMessageComponent />
      <SuccessMessage />
      <LoadingModal />
    </>
  );
};

export default App;
