import api from "@/api";
import { NotificationOffIcon } from "@/components/Icons";
import EmptyData from "@/components/layout/EmptyData";
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import NotificationGroup from "@/components/notification/NotificationGroup";
import PostContainer from "@/components/posts/PostContainer";
import { loading } from "@/helpers/layout";
import { error } from "@/helpers/notication";
import { IQuestion } from "@/interfaces";
import useAuthStore from "@/stores/authStore";
import { useNotificationsStore } from "@/stores/notifications";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const urlB64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const arrayBufferToBase64 = (buffer: ArrayBuffer | null) => {
  if (!buffer) {
    return null;
  }

  const uint8Array = new Uint8Array(buffer); // Convert ArrayBuffer to Uint8Array
  const binaryString = String.fromCharCode(...uint8Array); // Convert bytes to a binary string
  return btoa(binaryString); // Encode the binary string to Base64
};

const NotificationView = () => {
  const [isReady, setReady] = useState(false);
  const store = useNotificationsStore();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<IQuestion>();

  const enableNotifications = async () => {
    try {
      loading(true);
      const swReg = await navigator.serviceWorker.register(
        "/services/notification.js",
      );
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY,
        ),
      });

      const endpoint = subscription.endpoint;
      const auth = arrayBufferToBase64(subscription.getKey("auth"));
      const p256dh = arrayBufferToBase64(subscription.getKey("p256dh"));

      if (!endpoint || !auth || !p256dh) {
        error(
          `We couldn't get permission to send you push notifications. Please check your browser settings and try again.`,
        );
        return;
      }

      await api.user.setPushNotifications(
        authStore.state.user.id,
        endpoint,
        p256dh,
        auth,
      );
      authStore.patch({ is_push_notification_on: true });
    } catch {
      error(
        `We couldn't get permission to send you push notifications. Please check your browser settings and try again.`,
      );
    } finally {
      loading(false);
    }
  };

  const disableNotifications = () => {
    setQuestion({
      title: "Confirm Action",
      message:
        "Are you sure you want to disable push notifications? You will not get any notifications when you disable it.",
      onConfirm: confirmDisableNotifications,
    });
  };

  const confirmDisableNotifications = async () => {
    try {
      setQuestion(undefined);
      loading(true);
      await api.user.setPushNotifications(
        authStore.state.user.id,
        null,
        null,
        null,
      );
      authStore.patch({ is_push_notification_on: false });
    } finally {
      loading(false);
    }
  };

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
    if (!authStore.state.isLoggedIn) {
      navigate("/");
      return;
    }

    fetchNotifications();
  }, []);

  return (
    <>
      <Helmet>
        <title>Notifications - tinyblog.space</title>
      </Helmet>

      <div className="px-5 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl py-5 flex-grow">Notifications</h1>
          {authStore.state.user.is_push_notification_on && (
            <div>
              <button
                type="button"
                className="px-3 py-1 rounded hover:bg-neutral-200 outline-none"
                onClick={disableNotifications}
              >
                Push notifications:{" "}
                <span className=" text-green-600 font-bold">on</span>
              </button>
            </div>
          )}
        </div>

        {authStore.state.user.is_push_notification_on === false && (
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-10 border border-neutral-100">
            <div className="flex items-center space-x-4">
              <div className="hidden flex-shrink-0 text-neutral-400 md:block">
                <NotificationOffIcon size={64} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Push Notifications Disabled
                </h2>
                <p className="text-gray-600 mt-1">
                  Enable push notifications to stay updated with the latest
                  alerts and messages in real-time.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
                onClick={enableNotifications}
              >
                Enable Notifications
              </button>
            </div>
          </div>
        )}

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
        {question && (
          <ConfirmationModal
            title={question.title}
            message={question.message}
            onCancel={() => setQuestion(undefined)}
            onConfirm={question.onConfirm}
          />
        )}
      </div>
    </>
  );
};

export default NotificationView;
