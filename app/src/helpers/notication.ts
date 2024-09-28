import { MessageTypes } from "../enums";

export const error = (message: string) => {
  const event = new CustomEvent(MessageTypes.SimpleError, {
    detail: { message },
  });
  window.dispatchEvent(event);
};

export const notification = {
  error,
};
