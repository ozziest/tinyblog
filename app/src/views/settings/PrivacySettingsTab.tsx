import api from "@/api";
import Button from "@/components/inputs/Button";
import RadioInput from "@/components/inputs/RadioInput";
import RadioItem from "@/components/inputs/RadioItem";
import { loading } from "@/helpers/layout";
import useAuthStore from "@/stores/authStore";
import { AccountVisibility } from "@/types";
import { IUserApi } from "@/types/ApiTypes";
import { useState } from "react";

const PrivacySettingsTab = () => {
  const authStore = useAuthStore();
  const [state, setState] = useState<IUserApi>({
    ...authStore.state.user,
    account_visibility: authStore.state.user.account_visibility,
  });

  const handleChange = (value: string) => {
    setState({
      ...state,
      account_visibility: value as AccountVisibility,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      loading(true);
      event.preventDefault();

      await api.user.patch(state.id, {
        account_visibility: state.account_visibility,
      });

      authStore.patch({ account_visibility: state.account_visibility });
    } finally {
      loading(false);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-lg text-neutral-700 pb-5">
        Privacy settings
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <RadioInput
          name="location"
          label="Account visibility"
          description="You can select the account visibility."
        >
          <RadioItem
            value="public"
            label="Public"
            checked={state.account_visibility === "public"}
            description="Your profile and content are visible to everyone, including search engines."
            onChange={handleChange}
          />
          <RadioItem
            value="private"
            label="Private"
            checked={state.account_visibility === "private"}
            description="Only logged-in users can view your profile and content."
            onChange={handleChange}
          />
        </RadioInput>

        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default PrivacySettingsTab;
