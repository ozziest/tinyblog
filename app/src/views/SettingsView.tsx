import SubMenuButton from "@/components/buttons/SubMenuButton";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProfileSettingsTab from "./settings/ProfileSettingsTab";
import AccountSettingsTab from "./settings/AccountSettingsTab";
import PrivacySettingsTab from "./settings/PrivacySettingsTab";

type TabTypes = "profile" | "account" | "privacy";

interface ITab {
  key: TabTypes;
  title: string;
}

const TAB_MENUS: ITab[] = [
  {
    key: "profile",
    title: "Profile",
  },
  {
    key: "account",
    title: "Account",
  },
  {
    key: "privacy",
    title: "Privacy",
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

  const handleMenuClick = (item: ITab) => {
    setSearchParams("tab", item.key);
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

  return (
    <>
      <Helmet>
        <title>Settings - tinyblog.space</title>
      </Helmet>

      <div className="px-5 md:px-0">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl py-5 flex-grow">Settings</h1>
        </div>

        <div className=" flex justify-between">
          <div className="w-3/12 flex flex-col gap-0 border border-neutral-100 rounded overflow-hidden">
            {TAB_MENUS.map((item) => (
              <SubMenuButton
                key={item.key}
                isActive={tab === item.key}
                onClick={() => handleMenuClick(item)}
              >
                {item.title}
              </SubMenuButton>
            ))}
          </div>
          <div className="w-9/12 ml-4 p-5 border border-neutral-100 rounded">
            <CurrentTab />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsView;
