import { IBeforePatchContext } from "axe-api";

export default async ({ formData, req, res }: IBeforePatchContext) => {
  if (!req.original.auth) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (
    formData.push_notification_endpoint &&
    formData.push_notification_p256dh &&
    formData.push_notification_auth
  ) {
    formData.is_push_notification_on = true;
  } else {
    formData.is_push_notification_on = false;
  }

  if (!["public", "private"].includes(formData.account_visibility)) {
    formData.account_visibility = "public";
  }
};
