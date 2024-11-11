import mitt from "mitt";

type Events = {
  "option-modal:on": undefined;
};

export const emitter = mitt<Events>();
