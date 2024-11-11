import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../inputs/Button";
import SelectInput, { SelectInputModelType } from "../inputs/SelectInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { IOption } from "@/interfaces";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrendsOptionModal = ({ isOpen, onClose }: ModalProps) => {
  const [locations, setLocations] = useState<IOption[]>([]);

  const handleLocationSelection = (values: SelectInputModelType) => {
    setLocations(values as IOption[]);
  };

  return (
    <BaseModal
      title="Trends options"
      isOpen={isOpen}
      onClose={onClose}
      footer={<Button>Save</Button>}
    >
      <form className="flex flex-col gap-5">
        <SelectInput
          name="location"
          value={locations}
          setValue={handleLocationSelection}
          isMulti
          label="Location"
          description="Choose locations that interest you. You can customize your feed to see posts from multiple locations"
          options={SUPPORTED_LOCATIONS}
        />
      </form>
    </BaseModal>
  );
};

export default TrendsOptionModal;
