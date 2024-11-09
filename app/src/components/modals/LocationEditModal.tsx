import BaseModal from "./BaseModal";
import Button from "../inputs/Button";
import SelectInput from "../inputs/SelectInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { useState } from "react";
import { IOption } from "@/interfaces";

interface ModalProps {
  isOpen: boolean;
  location: string;
  setLocation: (value: string) => void;
  onClose: () => void;
}

const UserEditModal = ({
  isOpen,
  location,
  setLocation,
  onClose,
}: ModalProps) => {
  const [state, setState] = useState(location);

  const handleSave = () => {
    setLocation(state);
    onClose();
  };

  const currentValue =
    SUPPORTED_LOCATIONS.find((item) => item.value === state) ||
    SUPPORTED_LOCATIONS[0];

  return (
    <BaseModal
      title="Set location profile"
      isOpen={isOpen}
      onClose={onClose}
      footer={<Button onClick={handleSave}>Save</Button>}
    >
      <SelectInput
        name="location"
        value={currentValue}
        setValue={(item: IOption | IOption[] | null) =>
          setState((item as IOption).value)
        }
        label="Location"
        description="Choose your the location of your posts. This location helps others see where you're posting from and customizes your feed to show posts from selected regions."
        options={SUPPORTED_LOCATIONS}
      />
    </BaseModal>
  );
};

export default UserEditModal;
