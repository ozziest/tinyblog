import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavigationButton from "../buttons/NavigationButton";
import { DailyIcon, HashtagIcon, HomeIcon, LogoutIcon } from "../Icons";
import { format } from "date-fns";
import * as locales from "date-fns/locale";
import { DEFAULT_LANG } from "@/consts";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/about");
  };

  const dailyHashtag = format(new Date(), "ddMMMMyyyy", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: (locales as any)[DEFAULT_LANG],
  });

  return (
    <div className="mt-4 flex flex-col justify-between gap-1">
      <NavigationButton
        icon={<HomeIcon size={24} />}
        isActive={true}
        onClick={() => navigate("/")}
      >
        Home
      </NavigationButton>
      <NavigationButton
        icon={<DailyIcon size={24} />}
        isActive={false}
        onClick={() => navigate(`/tags/${dailyHashtag}`)}
      >
        #{dailyHashtag}
      </NavigationButton>
      <NavigationButton
        icon={<HashtagIcon size={22} />}
        isActive={false}
        onClick={() => navigate("/")}
      >
        Hashtags
      </NavigationButton>
      <NavigationButton
        icon={<LogoutIcon size={24} />}
        isActive={false}
        onClick={handleLogout}
      >
        Logout
      </NavigationButton>
    </div>
  );
};

export default Navigation;
