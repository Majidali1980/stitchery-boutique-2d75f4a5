
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { adminLoginInfo } from "@/data/admin-info";

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const adminAuth = 
      localStorage.getItem('isAdmin') === 'true' || 
      sessionStorage.getItem('isAdmin') === 'true';
    
    setIsAdmin(adminAuth);
    setLoading(false);
    
    if (!adminAuth) {
      toast({
        title: "Access denied",
        description: `Please sign in with email ${adminLoginInfo.email} to access the admin panel`,
        variant: "destructive"
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-brand-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
