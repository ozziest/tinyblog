import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavigationButton from "../buttons/NavigationButton";
import {
  AboutIcon,
  DailyIcon,
  HomeIcon,
  LogoutIcon,
  NewbiesIcon,
  NotificationIcon,
  OptionsIcon,
  ProfileIcon,
} from "../Icons";
import { useEffect, useRef, useState } from "react";
import api from "@/api";
import NavigationLink from "../buttons/NavigationLink";
import useDailyLink from "@/composables/useDailyLink";
import useProfileLink from "@/composables/useProfileLink";
import { emitter } from "@/helpers/events";
import { throttle } from "lodash";
import classNames from "classnames";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { dailyLink, dailyHashtag } = useDailyLink();
  const profileLink = useProfileLink();
  const location = useLocation();
  const [hashtags, setHashtags] = useState<string[]>([]);
  const isLoggedIn = authStore.state.isLoggedIn;

  const handleLogout = async () => {
    await api.user.logout();
    authStore.logout();
    navigate("/about");
  };

  const getReports = async () => {
    const response = await api.hashtag.report(authStore.getFeedLocations());
    if (response.status === 200) {
      setHashtags(await response.json());
    }
  };

  const throttledGetReports = useRef(
    throttle(getReports, 300, { leading: false, trailing: true }),
  );

  useEffect(() => {
    throttledGetReports.current();
  }, [authStore.state.user.locations]);

  useEffect(() => {
    throttledGetReports.current();
  }, []);

  return (
    <>
      <div
        className={classNames("mt-4 flex flex-col justify-between gap-[2px]")}
      >
        <NavigationButton
          icon={<HomeIcon size={24} />}
          isActive={location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          Home
        </NavigationButton>
        {isLoggedIn && (
          <>
            <NavigationButton
              icon={<NotificationIcon size={24} />}
              isActive={location.pathname === "/notifications"}
              onClick={() => navigate("/notifications")}
            >
              Notifications
            </NavigationButton>
            <NavigationButton
              icon={<NewbiesIcon size={24} />}
              isActive={location.pathname === "/newbies"}
              onClick={() => navigate("/newbies")}
            >
              Newbies
            </NavigationButton>
          </>
        )}
        <NavigationButton
          icon={<DailyIcon size={24} />}
          isActive={location.pathname === dailyLink}
          onClick={() => navigate(dailyLink)}
        >
          #{dailyHashtag}
        </NavigationButton>
        <NavigationButton
          icon={<AboutIcon size={24} />}
          isActive={location.pathname === "/about"}
          onClick={() => navigate("/about")}
        >
          About
        </NavigationButton>
        <hr className="my-5 border-neutral-200" />
        <h4 className="font-bold px-4 flex justify-between items-center">
          Trends
          {isLoggedIn && (
            <button
              type="button"
              className="bg-neutral-100 rounded-full p-1 transition hover:bg-neutral-200 duration-300"
              onClick={() => emitter.emit("option-modal:on")}
            >
              <OptionsIcon size={20} />
            </button>
          )}
        </h4>
        <div className="px-4 flex flex-col gap-2">
          {hashtags.map((hashtag) => (
            <NavigationLink
              key={hashtag}
              to={`/tags/${hashtag.replace("#", "")}`}
            >
              {hashtag}
            </NavigationLink>
          ))}
          {hashtags.length === 0 && (
            <div className="text-sm text-neutral-400 text-center py-5">
              Hashtag trends will be displayed here. You can customize your
              trending preferences by selecting multiple locations.
            </div>
          )}
        </div>

        {isLoggedIn && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;
