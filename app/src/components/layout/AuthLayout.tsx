import { Outlet } from "react-router-dom";
import LogoFull from "./LogoFull";

const AuthLayout = () => {
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
