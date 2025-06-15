
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Proposals from "./pages/Proposals";
import RFPs from "./pages/RFPs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import NewRFPPage from "./pages/NewRFPPage";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "crm",
        element: <CRM />,
      },
      {
        path: "proposals",
        element: <Proposals />,
      },
      {
        path: "rfps",
        element: <RFPs />,
      },
      {
        path: "rfps/new",
        element: <NewRFPPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      // Routes for features under construction, leading to a helpful page
      { path: "archive", element: <NotFound /> },
      { path: "reports", element: <NotFound /> },
      { path: "documents", element: <NotFound /> },
      { path: "notifications", element: <NotFound /> },
      { path: "ai-admin", element: <NotFound /> },
      { path: "help", element: <NotFound /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
