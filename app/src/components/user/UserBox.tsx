import useAuthStore from "@/stores/authStore";
import Stats from "./Stats";

const UserBox = () => {
  const state = useAuthStore((store) => store.state);

  return (
    <div className="border border-neutral-100 p-4 rounded  bg-white">
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{state.user.name}</div>
        <div className="text-neutral-500 font-semibold text-sm">
          @{state.user.username}
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-4">
        <Stats title="Shares" count={state.user.stats_post} />
        <Stats title="Followers" count={state.user.stats_follower} />
        <Stats title="Following" count={state.user.stats_following} />
      </div>
    </div>
  );
};

export default UserBox;
