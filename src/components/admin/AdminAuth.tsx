
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { adminLoginInfo } from "@/data/admin-info";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, userId, isLoaded } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) {
      // Check if the user is signed in with Clerk
      if (!isSignedIn || !userId) {
        setIsAdmin(false);
        setLoading(false);
        toast({
          title: "Access denied",
          description: "Please sign in to continue",
          variant: "destructive"
        });
        return;
      }

      // For this demo, we're checking against hardcoded admin credentials
      // In a real app, you'd check against a database
      const isAuthorized = isSignedIn && (
        localStorage.getItem('isAdmin') === 'true' || 
        sessionStorage.getItem('isAdmin') === 'true'
      );
      
      setIsAdmin(isAuthorized);
      setLoading(false);
      
      if (!isAuthorized) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access the admin panel",
          variant: "destructive"
        });
      }
    }
  }, [isSignedIn, userId, isLoaded]);

  if (loading || !isLoaded) {
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
