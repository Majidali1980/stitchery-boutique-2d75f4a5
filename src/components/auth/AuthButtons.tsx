
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  SignInButton, 
  SignUpButton,
  UserButton
} from "@clerk/clerk-react";

export const AuthButtons = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  return (
    <div className="flex items-center space-x-4">
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:inline-block">
            Hi, {user?.firstName || 'User'}
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-white" size="sm">Sign Up</Button>
          </SignUpButton>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
