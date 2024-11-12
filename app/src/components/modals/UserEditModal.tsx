import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import TextInput from "../inputs/TextInput";
import { IUserApi } from "@/types/ApiTypes";
import TextareaInput from "../inputs/TextareaInput";
import Button from "../inputs/Button";
import api from "@/api";
import useAuthStore from "@/stores/authStore";
import SelectInput, { SelectInputModelType } from "../inputs/SelectInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { IOption } from "@/interfaces";
import { IValidationResult, validate } from "robust-validator";
import { emitter } from "@/helpers/events";

interface ModalProps {
  user: IUserApi;
}

type LocationType = IOption | null;

const UserEditModal = ({ user }: ModalProps) => {
  const authStore = useAuthStore();
  const [isOpen, setOpen] = useState(false);
  const [state, setState] = useState<IUserApi>({
    ...user,
    email: authStore.state.user.email,
    location: authStore.state.user.location,
    bio: authStore.state.user.bio,
  });
  const [location, setLocation] = useState<LocationType>(
    SUPPORTED_LOCATIONS.find((item) => item.value === state.location) || null,
  );
  const [validation, setValidation] = useState<IValidationResult>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await validate(state, {
      bio: "max:240",
      location: "required|min:2|max:2",
      name: "required|min:3|max:50",
    });
    setValidation(result);
    if (result.isInvalid) {
      return;
    }

    await api.user.patch(
      state.id,
      state.name,
      location?.value || "WW",
      state.bio,
    );
    handleClose();
  };

  const handleClose = () => {
    emitter.emit("user-edit-modal:off");
    setOpen(false);
  };

  useEffect(() => {
    const openHandler = () => setOpen(true);
    emitter.on("user-edit-modal:on", openHandler);

    return () => emitter.off("user-edit-modal:on", openHandler);
  }, []);

  return (
    <BaseModal
      title="Edit profile"
      isOpen={isOpen}
      onClose={handleClose}
      footer={
        <Button type="button" onClick={handleSubmit}>
          Save
        </Button>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextInput
          name="email"
          label="E-mail"
          description="You can not change your e-mail address."
          value={state.email}
          disabled
        />
        <TextInput
          name="username"
          label="Username"
          description="You can not change your username."
          value={state.username}
          disabled
        />
        <TextInput
          name="name"
          label="Name"
          description="This is the profile name. Using a real name is more cool."
          value={state.name}
          onChange={(event) => handleChange(event, "name")}
          validation={validation}
        />
        <SelectInput
          name="location"
          value={location}
          setValue={(value: SelectInputModelType) =>
            setLocation(value as LocationType)
          }
          label="Default location"
          description="Choose your default location to tag your posts. This location helps others see where you're posting from and customizes your feed to show posts from selected regions."
          options={SUPPORTED_LOCATIONS}
          validation={validation}
        />
        <TextareaInput
          name="bio"
          label="Biography"
          description="You can describe your account in 240 characters."
          value={state.bio}
          placeholder="You may write something about yourself..."
          onChange={(event) => handleChange(event, "bio")}
          maxLength={240}
          validation={validation}
        />
      </form>
    </BaseModal>
  );
};

export default UserEditModal;
