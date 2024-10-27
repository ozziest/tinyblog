import { IRegistrationRequest } from "@/interfaces";
import { resource } from "axe-api-client";

interface SetEmailRequest {
  email: string;
  cfToken: string | null;
  csrf: string;
}

const setEmail = async (data: SetEmailRequest) => {
  return resource("registrations").post(data);
};

const confirm = async (id: string, code: string) => {
  return resource(`registrations/${id}/confirm`).patch({ code });
};

const patch = async (id: string, data: IRegistrationRequest) => {
  return resource(`registrations/${id}`).patch(data);
};

export default {
  setEmail,
  confirm,
  patch,
};
