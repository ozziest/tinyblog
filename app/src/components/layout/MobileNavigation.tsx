import { useNavigate } from "react-router-dom";
import { DailyIcon, HomeIcon, NotificationIcon, ProfileIcon } from "../Icons";
import MobileNavigationButton from "../buttons/MobileNavigationButton";
import useDailyLink from "@/composables/useDailyLink";
import useProfileLink from "@/composables/useProfileLink";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const { dailyLink } = useDailyLink();
  const profileLink = useProfileLink();

  return (
    <div className="fixed left-0 bottom-0 w-full bg-white border-t border-neutral-200 lg:hidden flex justify-between items-center z-50">
      <MobileNavigationButton
        icon={<HomeIcon size={24} />}
        isActive={location.pathname === "/"}
        onClick={() => navigate("/")}
      />
      <MobileNavigationButton
        icon={<DailyIcon size={24} />}
        isActive={location.pathname === dailyLink}
        onClick={() => navigate(dailyLink)}
      />
      <MobileNavigationButton
        icon={<NotificationIcon size={24} />}
        isActive={location.pathname === "/notifications"}
        onClick={() => navigate("/notifications")}
      />
      <MobileNavigationButton
        icon={<ProfileIcon size={30} />}
        isActive={location.pathname === profileLink}
        onClick={() => navigate(profileLink)}
      />
    </div>
  );
};

export default MobileNavigation;
