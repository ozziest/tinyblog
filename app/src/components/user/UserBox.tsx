import useAuthStore from "@/stores/authStore";
import Stats from "./Stats";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import useProfileLink from "@/composables/useProfileLink";

const UserBox = () => {
  const state = useAuthStore((store) => store.state);
  const profileLink = useProfileLink();

  return (
    <div className="border border-neutral-100 p-4 rounded  bg-white">
      <div className=" flex justify-between gap-3">
        <Link to={profileLink}>
          <Avatar user={state.user} />
        </Link>
        <div className="flex-grow flex flex-col">
          <Link to={profileLink} className="text-xl font-semibold">
            {state.user.name}
          </Link>
          <Link
            to={profileLink}
            className="text-neutral-500 font-semibold text-sm"
          >
            @{state.user.username}
          </Link>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-4">
        <Stats title="Posts" count={state.user.stats_post} />
        <Stats title="Followers" count={state.user.stats_follower} />
        <Stats title="Following" count={state.user.stats_following} />
      </div>
    </div>
  );
};

export default UserBox;
