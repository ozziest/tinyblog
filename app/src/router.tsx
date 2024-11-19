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
import TermsView from "./views/TermsView";
import PrivacyPolicyView from "./views/PrivacyPolicyView";
import CookiePolicyView from "./views/CookiePolicyView";
import NewbiesView from "./views/NewbiewView";
import GeneralError from "./components/errors/GeneralError";
import ViewError from "./components/errors/ViewError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SessionLayout />,
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: <DashboardView />,
        errorElement: <ViewError />,
      },
      {
        path: "/notifications",
        element: <NotificationView />,
        errorElement: <ViewError />,
      },
      {
        path: "/newbies",
        element: <NewbiesView />,
        errorElement: <ViewError />,
      },
      {
        path: "/u/:username",
        element: <ProfileView />,
        errorElement: <ViewError />,
      },
      {
        path: "/tags/:tag",
        element: <TagsView />,
        errorElement: <ViewError />,
      },
      {
        path: "/:postId",
        element: <PostDetailView />,
        errorElement: <ViewError />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <GeneralError />,
    children: [
      {
        path: "login",
        element: <LoginView />,
        errorElement: <ViewError />,
      },
      {
        path: "register",
        element: <RegisterView />,
        errorElement: <ViewError />,
      },
      {
        path: "forget-password",
        element: <ForgetPasswordView />,
        errorElement: <ViewError />,
      },
    ],
  },
  {
    path: "confirm",
    element: <AuthLayout />,
    errorElement: <GeneralError />,
    children: [
      {
        path: "email/:secret/:code",
        element: <EmailConfirmationView />,
        errorElement: <ViewError />,
      },
      {
        path: "reset-password/:secret/:code",
        element: <ResetPasswordView />,
        errorElement: <ViewError />,
      },
      {
        path: "email",
        element: <EmailConfirmationResetView />,
        errorElement: <ViewError />,
      },
    ],
  },
  { path: "/about", element: <AboutView /> },
  { path: "/terms", element: <TermsView /> },
  { path: "/privacy-policy", element: <PrivacyPolicyView /> },
  { path: "/cookie-policy", element: <CookiePolicyView /> },
  { path: "*", element: <PageNotFoundView /> },
]);

export default router;
