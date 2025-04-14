
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";

interface AuthProtectedProps {
  children: React.ReactNode;
}

export const AuthProtected = ({ children }: AuthProtectedProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [isLoaded, isSignedIn]);
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-gold"></div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

export default AuthProtected;
