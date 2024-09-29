import { createBrowserRouter } from "react-router-dom";
import FeedsView from "./views/FeedsView";
import SessionLayout from "./components/layout/SessionLayout";
import AuthLayout from "./components/layout/AuthLayout";
import FeedView from "./views/FeedView";
import UserView from "./views/UserView";
import PageNotFoundView from "./views/PageNotFoundView";
import LoginView from "./views/user/LoginView";
import RegisterView from "./views/user/RegisterView";
import EmailConfirmationView from "./views/user/EmailConfirmationView";
import EmailConfirmationResetView from "./views/user/EmailConfirmationResetView";
import ForgetPasswordView from "./views/user/ForgetPasswordView";
import ResetPasswordView from "./views/user/ResetPasswordView";

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
      {
        path: "forget-password",
        element: <ForgetPasswordView />,
      },
    ],
  },
  {
    path: "confirm",
    element: <AuthLayout />,
    children: [
      {
        path: "email/:secret/:code",
        element: <EmailConfirmationView />,
      },
      {
        path: "reset-password/:secret/:code",
        element: <ResetPasswordView />,
      },
      {
        path: "email",
        element: <EmailConfirmationResetView />,
      },
    ],
  },
  { path: "*", element: <PageNotFoundView /> },
]);

export default router;
