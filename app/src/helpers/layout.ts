import { MessageTypes } from "@/enums";

export const loading = (status: boolean) => {
  const event = new CustomEvent(MessageTypes.Loading, {
    detail: { status },
  });
  window.dispatchEvent(event);
};

export const notification = {
  loading,
};
