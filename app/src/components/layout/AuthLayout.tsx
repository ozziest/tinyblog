import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-center text-xl font-semibold py-4">
          tinyblog.space
        </h1>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
