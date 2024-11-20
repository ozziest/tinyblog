import api from "@/api";
import Button from "@/components/inputs/Button";
import SelectInput, {
  SelectInputModelType,
} from "@/components/inputs/SelectInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import { SUPPORTED_LOCATIONS } from "@/consts";
import { loading } from "@/helpers/layout";
import { IOption } from "@/interfaces";
import useAuthStore from "@/stores/authStore";
import { IUserApi } from "@/types/ApiTypes";
import { useState } from "react";
import { IValidationResult, validate } from "robust-validator";

type LocationType = IOption | null;

const ProfileSettingsTab = () => {
  const authStore = useAuthStore();
  const [state, setState] = useState<IUserApi>({
    ...authStore.state.user,
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
    try {
      loading(true);
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

      await api.user.patch(state.id, {
        name: state.name,
        location: location?.value || "WW",
        bio: state.bio,
      });
    } finally {
      loading(false);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-lg text-neutral-700 pb-5">
        Profile settings
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default ProfileSettingsTab;
