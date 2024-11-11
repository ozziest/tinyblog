import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../inputs/Button";
import SelectInput, { SelectInputModelType } from "../inputs/SelectInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { IOption } from "@/interfaces";
import { emitter } from "@/helpers/events";

const TrendsOptionModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [locations, setLocations] = useState<IOption[]>([]);

  const handleLocationSelection = (values: SelectInputModelType) => {
    setLocations(values as IOption[]);
  };

  useEffect(() => {
    emitter.on("option-modal:on", () => setOpen(true));

    return () => emitter.off("option-modal:on", () => setOpen(false));
  }, []);

  if (!isOpen) {
    return;
  }

  return (
    <BaseModal
      title="Trends options"
      isOpen={true}
      onClose={() => setOpen(false)}
      footer={<Button>Apply</Button>}
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
