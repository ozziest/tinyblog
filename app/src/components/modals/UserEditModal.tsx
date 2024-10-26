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
    <BaseModal title="Edit profile options" isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput name="email" label="E-mail" value={state.email} disabled />
        <TextInput
          name="username"
          label="Username"
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
          options={SUPPORTED_LOCATIONS}
          onChange={() => console.log("here")}
        />
        <TextareaInput
          name="bio"
          label="Biography"
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
