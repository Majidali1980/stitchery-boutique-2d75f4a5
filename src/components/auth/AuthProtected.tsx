
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";

interface AuthProtectedProps {
  children: React.ReactNode;
}

export const AuthProtected = ({ children }: AuthProtectedProps) => {
  return <>{children}</>;
};

export default AuthProtected;
