
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const path = location.pathname;
  const basePath = path.split('/').slice(0, 2).join('/');
  
  // Base routes that have tab interfaces
  const tabRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/crm", label: "Clients & CRM" },
    { path: "/rfps", label: "RFPs" },
    { path: "/proposals", label: "Proposal Builder" },
    { path: "/archive", label: "Archive" },
    { path: "/reports", label: "Reports & Insights" },
    { path: "/documents", label: "Documents & Templates" },
    { path: "/notifications", label: "Notifications & Approvals" },
    { path: "/ai-admin", label: "AI Admin Console" },
    { path: "/settings", label: "Settings" },
    { path: "/help", label: "Feedback & Help" },
  ];
  
  const currentSection = tabRoutes.find(route => route.path === basePath);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-lg text-muted-foreground mb-6">
        This feature is currently being developed and will be available soon.
      </p>
      
      {currentSection && (
        <div className="mb-6">
          <p className="mb-2">Return to the main {currentSection.label} section:</p>
          <Button asChild>
            <Link to={basePath}>Go to {currentSection.label}</Link>
          </Button>
        </div>
      )}
      
      <div className="mt-4">
        <Button variant="outline" asChild>
          <Link to="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
