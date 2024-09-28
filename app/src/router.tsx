import { createBrowserRouter } from "react-router-dom";
import FeedsView from "./views/FeedsView";
import LoginView from "./views/LoginView";
import SessionLayout from "./components/layout/SessionLayout";
import AuthLayout from "./components/layout/AuthLayout";
import FeedView from "./views/FeedView";
import UserView from "./views/UserView";
import RegisterView from "./views/RegisterView";
import PageNotFoundView from "./views/PageNotFoundView";
import EmailConfirmationView from "./views/EmailConfirmationView";

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
  {
    path: "confirm",
    element: <AuthLayout />,
    children: [
      {
        path: "email/:secret/:code",
        element: <EmailConfirmationView />,
      },
    ],
  },
  { path: "*", element: <PageNotFoundView /> },
]);

export default router;
