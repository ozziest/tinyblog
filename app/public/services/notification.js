/* eslint-disable no-undef */

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "tinyblog.space";
  const options = {
    body: data.body || "You have a new notification!",
    icon: data.icon || "/logo.svg",
    data: {
      url: data.url || "https://tinyblog.space/notifications",
    },
    actions: [{ action: "open_url", title: "Open Link" }],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  // Open the link specified in notification data
  event.waitUntil(
    clients.openWindow(event.notification.data.url), // Open the URL in a new tab/window
  );
});
