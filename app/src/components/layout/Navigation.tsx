import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavigationButton from "../buttons/NavigationButton";
import { DailyIcon, HomeIcon, LogoutIcon } from "../Icons";
import { format } from "date-fns";
import * as locales from "date-fns/locale";
import { DEFAULT_LANG } from "@/consts";
import { useEffect, useState } from "react";
import api from "@/api";
import NavigationLink from "../buttons/NavigationLink";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleLogout = () => {
    authStore.logout();
    navigate("/about");
  };

  const getReports = async () => {
    const response = await api.hashtag.report();
    if (response.status === 200) {
      setHashtags(await response.json());
    }
  };

  const dailyHashtag = format(new Date(), "ddMMMMyyyy", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: (locales as any)[DEFAULT_LANG],
  });

  const dailyLink = `/tags/${dailyHashtag}`;

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="mt-4 flex flex-col justify-between gap-1">
      <NavigationButton
        icon={<HomeIcon size={24} />}
        isActive={location.pathname === "/"}
        onClick={() => navigate("/")}
      >
        Home
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
