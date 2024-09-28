import { Outlet } from "react-router-dom";
import LogoFull from "./LogoFull";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <LogoFull />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
