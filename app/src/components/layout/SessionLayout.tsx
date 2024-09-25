import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import UserBox from "../user/UserBox";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";

const SessionLayout = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (authStore.state.isLoggedIn) {
      setReady(true);
    } else {
      navigate("/auth/login");
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="pb-10">
      <Header />
      <div className="max-w-screen-lg mx-auto mt-2">
        <div className="flex justify-between">
          <div className="w-8/12">
            <Outlet />
          </div>
          <div className="w-4/12 min-w-4/12 px-4">
            <div className="sticky top-[40px]">
              <UserBox />
              <Navigation />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionLayout;
