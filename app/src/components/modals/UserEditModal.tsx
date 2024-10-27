import React, { useState } from "react";
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

interface ModalProps {
  user: IUserApi;
  isOpen: boolean;
  onClose: () => void;
}

type LocationType = IOption | null;

const UserEditModal = ({ user, isOpen, onClose }: ModalProps) => {
  const authStore = useAuthStore();
  const [state, setState] = useState<IUserApi>({
    ...user,
    email: authStore.state.user.email,
    location: authStore.state.user.location,
  });
  const [location, setLocation] = useState<LocationType>(
    SUPPORTED_LOCATIONS.find((item) => item.value === state.location) || null,
  );

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
    await api.user.patch(state.id, location?.value || "WW", state.bio);
    onClose();
  };

  return (
    <BaseModal title="Edit profile" isOpen={isOpen} onClose={onClose}>
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
        <SelectInput
          name="location"
          value={location}
          setValue={(value: SelectInputModelType) =>
            setLocation(value as LocationType)
          }
          label="Default location"
          description="Choose your default location to tag your posts. This location helps others see where you're posting from and customizes your feed to show posts from selected regions."
          options={SUPPORTED_LOCATIONS}
        />
        <TextareaInput
          name="bio"
          label="Biography"
          description="You can describe your account in 240 characters."
          value={state.bio}
          placeholder="You may write something about yourself..."
          onChange={(event) => handleChange(event, "bio")}
          maxLength={240}
        />

        <div>
          <Button>Save</Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default UserEditModal;
