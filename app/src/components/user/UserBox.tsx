import useAuthStore from "../../stores/authStore";
import Stats from "./Stats";

const UserBox = () => {
  const authStore = useAuthStore();

  return (
    <div className="border border-neutral-100 p-4 rounded  bg-white">
      <div className="flex flex-col">
        <div className="text-xl font-semibold">{authStore.state.user.name}</div>
        <div className="text-neutral-500 font-semibold text-sm">
          @{authStore.state.user.username}
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-4">
        <Stats title="Shares" count={0} />
        <Stats title="Followers" count={0} />
        <Stats title="Following" count={0} />
      </div>
    </div>
  );
};

export default UserBox;
