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
    <div className="w-screen h-screen flex justify-center overflow-scroll lg:p-20">
      <div className=" w-full">
        <LogoFull />
        <div className="pb-40 flex justify-center">
          <div className="p-4 md:p-8 rounded w-full md:border md:border-neutral-200 md:w-[500px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
