
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { adminLoginInfo } from "@/data/admin-info";

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, userId, isLoaded } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) {
      const checkAdminStatus = () => {
        // For this demo app, we use localStorage or sessionStorage
        // for admin authentication
        const adminAuth = 
          localStorage.getItem('isAdmin') === 'true' || 
          sessionStorage.getItem('isAdmin') === 'true';
        
        // If using Clerk, we can also check for signed in status
        const clerkAuth = isSignedIn && userId;
        
        // Consider admin if either method is true (for flexibility in demo)
        setIsAdmin(adminAuth || Boolean(clerkAuth));
        setLoading(false);
        
        if (!(adminAuth || Boolean(clerkAuth))) {
          toast({
            title: "Access denied",
            description: `Please sign in with email ${adminLoginInfo.email} to access the admin panel`,
            variant: "destructive"
          });
        }
      };
      
      checkAdminStatus();
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
