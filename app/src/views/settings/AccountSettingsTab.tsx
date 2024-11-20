import TextInput from "@/components/inputs/TextInput";
import useAuthStore from "@/stores/authStore";
import { IUserApi } from "@/types/ApiTypes";
import { useState } from "react";

const AccountSettingsTab = () => {
  const authStore = useAuthStore();
  const [state] = useState<IUserApi>({
    ...authStore.state.user,
    email: authStore.state.user.email,
  });

  return (
    <>
      <h2 className="font-semibold text-lg text-neutral-700 pb-5">
        Account settings
      </h2>
      <form className="flex flex-col gap-5">
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
      </form>
    </>
  );
};

export default AccountSettingsTab;
