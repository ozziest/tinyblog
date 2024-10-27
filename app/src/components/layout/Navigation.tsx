import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavigationButton from "../buttons/NavigationButton";
import {
  DailyIcon,
  HomeIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
} from "../Icons";
import { useEffect, useState } from "react";
import api from "@/api";
import NavigationLink from "../buttons/NavigationLink";
import useDailyLink from "@/composables/useDailyLink";
import useProfileLink from "@/composables/useProfileLink";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { dailyLink, dailyHashtag } = useDailyLink();
  const profileLink = useProfileLink();
  const location = useLocation();
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleLogout = async () => {
    await api.user.logout();
    authStore.logout();
    navigate("/about");
  };

  const getReports = async () => {
    const response = await api.hashtag.report();
    if (response.status === 200) {
      setHashtags(await response.json());
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="mt-4 flex flex-col justify-between gap-[2px]">
      <NavigationButton
        icon={<HomeIcon size={24} />}
        isActive={location.pathname === "/"}
        onClick={() => navigate("/")}
      >
        Home
      </NavigationButton>
      <NavigationButton
        icon={<NotificationIcon size={24} />}
        isActive={location.pathname === "/notifications"}
        onClick={() => navigate("/notifications")}
      >
        Notifications
      </NavigationButton>
      <NavigationButton
        icon={<DailyIcon size={24} />}
        isActive={location.pathname === dailyLink}
        onClick={() => navigate(dailyLink)}
      >
        #{dailyHashtag}
      </NavigationButton>
      {hashtags.length > 0 && (
        <>
          <hr className="my-5 border-neutral-200" />
          <h4 className="font-bold px-4">Trends</h4>
          <div className="px-4 flex flex-col gap-2">
            {hashtags.map((hashtag) => (
              <NavigationLink
                key={hashtag}
                to={`/tags/${hashtag.replace("#", "")}`}
              >
                {hashtag}
              </NavigationLink>
            ))}
          </div>
        </>
      )}
      <hr className="my-5 border-neutral-200" />
      <NavigationButton
        icon={<ProfileIcon size={24} />}
        isActive={location.pathname === profileLink}
        onClick={() => navigate(profileLink)}
      >
        Profile
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
