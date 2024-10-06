import { Outlet, useNavigate } from "react-router-dom";
import LogoFull from "./LogoFull";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";

const AuthLayout = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (!authStore.state.isLoggedIn) {
      setReady(true);
    } else {
      navigate("/");
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex justify-center overflow-scroll p-20">
      <div>
        <LogoFull />
        <div className="pb-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
