import useAuthStore from "@/stores/authStore";

const useProfileLink = () => {
  const state = useAuthStore((store) => store.state);

  return `/u/${state.user.username}`;
};

export default useProfileLink;
