import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../inputs/Button";
import SelectInput, {
  SelectAction,
  SelectInputModelType,
} from "../inputs/SelectInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { IOption } from "@/interfaces";
import { emitter } from "@/helpers/events";
import api from "@/api";
import useAuthStore, { AuthStoreState } from "@/stores/authStore";

const getDefaultLocations = (state: AuthStoreState): IOption[] => {
  return state.user.locations
    .map((location) => {
      const item = SUPPORTED_LOCATIONS.find(
        (item) => item.value === location.location,
      );
      return item;
    })
    .filter((item) => item) as IOption[];
};

const TrendsOptionModal = () => {
  const authStore = useAuthStore();
  const [isOpen, setOpen] = useState(false);
  const [locations, setLocations] = useState<IOption[]>(
    getDefaultLocations(authStore.state),
  );

  const handleOnSelect = async (option: IOption, action: SelectAction) => {
    if (action === "select") {
      const response = await api.user.feedLocation.create(
        authStore.state.user.id,
        option.value,
      );

      if (response.status === 201) {
        const newLocations = [
          ...authStore.state.user.locations,
          await response.json(),
        ];
        authStore.setFeedLocations(newLocations);
      }
      return;
    }

    const selection = authStore.state.user.locations.find(
      (location) => location.location === option.value,
    );
    if (!selection) {
      return;
    }

    await api.user.feedLocation.remove(authStore.state.user.id, selection.id);

    const newLocations = authStore.state.user.locations.filter(
      (item) => item.id !== selection.id,
    );
    authStore.setFeedLocations(newLocations);
  };

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
          onSelect={handleOnSelect}
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
