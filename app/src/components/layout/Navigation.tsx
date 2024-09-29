import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

const Navigation = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/auth/login");
  };

  return (
    <div className="py-4">
      <button
        type="button"
        className="font-semibold text-sm text-neutral-900"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navigation;
