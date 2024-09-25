import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FeedsView from "./views/FeedsView";
import LoginView from "./views/LoginView";
import SessionLayout from "./components/layout/SessionLayout";
import AuthLayout from "./components/layout/AuthLayout";
import FeedView from "./views/FeedView";
import UserView from "./views/UserView";
import RegisterView from "./views/RegisterView";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.baseURL = "http://localhost:3005/api/v1";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SessionLayout />,
    children: [
      {
        index: true,
        element: <FeedsView />,
      },
      {
        path: "/u/:username",
        element: <UserView />,
      },
      {
        path: "/:feedId",
        element: <FeedView />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
