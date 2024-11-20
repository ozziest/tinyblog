import { Outlet } from "react-router-dom";
import Header from "./Header";
import UserBox from "@/components/user/UserBox";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import api from "@/api";
import { IUserApi } from "@/types/ApiTypes";
import MobileNavigation from "./MobileNavigation";
import TrendsOptionModal from "../modals/TrendsOptionModal";
import ScrollToTop from "./ScrollToTop";
import classNames from "classnames";

const SessionLayout = () => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.state.isLoggedIn;

  const getMeData = async () => {
    if (isLoggedIn) {
      const response = await api.user.getMyself();
      const user: IUserApi = await response.json();
      authStore.update(user);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getMeData();
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="pb-10">
        <Header />
        <div className="max-w-screen-lg mx-auto md:mt-2">
          <div className="flex justify-between">
            <div className="w-full lg:w-8/12">
              <Outlet />
            </div>
            <div className="w-0 hidden lg:block lg:w-4/12 lg:min-w-4/12 lg:pl-4">
              <div
                className={classNames("sticky top-[40px] overflow-visible", {
                  "top-[60px]": !isLoggedIn,
                })}
              >
                <UserBox />
                <Navigation />
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <MobileNavigation />
        <TrendsOptionModal />
      </div>
    </>
  );
};

export default SessionLayout;
