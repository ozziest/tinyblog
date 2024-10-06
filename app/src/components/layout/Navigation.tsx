import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavigationButton from "../buttons/NavigationButton";
import { DailyIcon, HashtagIcon, HomeIcon, LogoutIcon } from "../Icons";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/auth/login");
  };

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
        onClick={() => navigate("/")}
      >
        Daily
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
