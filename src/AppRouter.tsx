
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Proposals from "./pages/Proposals";
import RFPs from "./pages/RFPs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/AuthContext";

const AppRouter = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: user ? <Navigate to="/dashboard" /> : <AuthPage />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
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
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
