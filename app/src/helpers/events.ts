import mitt from "mitt";

type Events = {
  "option-modal:on": undefined;
  "user-edit-modal:on": undefined;
  "user-edit-modal:off": undefined;
};

export const emitter = mitt<Events>();
