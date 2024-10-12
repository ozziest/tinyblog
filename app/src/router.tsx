import { createBrowserRouter } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import SessionLayout from "./components/layout/SessionLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PostDetailView from "./views/PostDetailView";
import ProfileView from "./views/ProfileView";
import PageNotFoundView from "./views/PageNotFoundView";
import LoginView from "./views/user/LoginView";
import RegisterView from "./views/user/RegisterView";
import EmailConfirmationView from "./views/user/EmailConfirmationView";
import EmailConfirmationResetView from "./views/user/EmailConfirmationResetView";
import ForgetPasswordView from "./views/user/ForgetPasswordView";
import ResetPasswordView from "./views/user/ResetPasswordView";
import TagsView from "./views/TagsView";
import AboutView from "./views/AboutView";
import NotificationView from "./views/NotificationView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SessionLayout />,
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: "/notifications",
        element: <NotificationView />,
      },
      {
        path: "/u/:username",
        element: <ProfileView />,
      },
      {
        path: "/tags/:tag",
        element: <TagsView />,
      },
      {
        path: "/:postId",
        element: <PostDetailView />,
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
  { path: "/about", element: <AboutView /> },
  { path: "*", element: <PageNotFoundView /> },
]);

export default router;
