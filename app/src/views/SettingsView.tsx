import SubMenuButton from "@/components/buttons/SubMenuButton";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProfileSettingsTab from "./settings/ProfileSettingsTab";
import AccountSettingsTab from "./settings/AccountSettingsTab";
import PrivacySettingsTab from "./settings/PrivacySettingsTab";
import SelectInput, {
  SelectInputModelType,
} from "@/components/inputs/SelectInput";
import { IOption } from "@/interfaces";

type TabTypes = "profile" | "account" | "privacy";

const TAB_MENUS: IOption[] = [
  {
    value: "profile",
    label: "Profile",
  },
  {
    value: "account",
    label: "Account",
  },
  {
    value: "privacy",
    label: "Privacy",
  },
];

const TAB_MAP: Record<TabTypes, () => JSX.Element> = {
  profile: ProfileSettingsTab,
  account: AccountSettingsTab,
  privacy: PrivacySettingsTab,
};

const SettingsView = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [searchParams, setUseSearchParams] = useSearchParams();

  const tab: TabTypes = (searchParams.get("tab") as TabTypes) || "profile";

  const setSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setUseSearchParams(newParams);
  };

  const handleMenuClick = (item: IOption) => {
    setSearchParams("tab", item.value);
  };

  useEffect(() => {
    if (!authStore.state.isLoggedIn) {
      navigate("/");
      return;
    }
  }, []);

  if (!tab) {
    return <LoadingSpinner />;
  }

  const CurrentTab = TAB_MAP[tab];
  const selectedTab = TAB_MENUS.find((item) => item.value === tab);

  return (
    <>
      <Helmet>
        <title>Settings - tinyblog.space</title>
      </Helmet>

      <div className="px-5 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl py-5 flex-grow">Settings</h1>
        </div>

        <div className="md:hidden pb-5">
          <SelectInput
            name="location"
            value={selectedTab as SelectInputModelType}
            setValue={(item) => handleMenuClick(item as IOption)}
            options={TAB_MENUS}
          />
        </div>

        <div className=" flex justify-between">
          <div className="hidden md:block w-3/12">
            <div className="flex flex-col gap-0 border border-neutral-100 rounded overflow-hidden">
              {TAB_MENUS.map((item) => (
                <SubMenuButton
                  key={item.value}
                  isActive={tab === item.value}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.label}
                </SubMenuButton>
              ))}
            </div>
          </div>
          <div className="w-full md:w-9/12 md:ml-4 p-5 border border-neutral-100 rounded">
            <CurrentTab />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsView;
