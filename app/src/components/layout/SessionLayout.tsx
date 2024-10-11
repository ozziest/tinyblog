import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import UserBox from "@/components/user/UserBox";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import api from "@/api";
import { IUserApi } from "@/types/ApiTypes";
import MobileNavigation from "./MobileNavigation";

const SessionLayout = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [isReady, setReady] = useState(false);

  const getMeData = async () => {
    const response = await api.user.getMyself();
    const user: IUserApi = await response.json();
    authStore.update(user);
  };

  useEffect(() => {
    if (authStore.state.isLoggedIn) {
      setReady(true);
      getMeData();
    } else {
      navigate("/about");
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="pb-10">
      <Header />
      <div className="max-w-screen-lg mx-auto mt-2 ">
        <div className="flex justify-between">
          <div className="w-full lg:w-8/12">
            <Outlet />
          </div>
          <div className="w-0 lg:w-4/12 lg:min-w-4/12 lg:pl-4">
            <div className="sticky top-[40px]">
              <UserBox />
              <Navigation />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default SessionLayout;
