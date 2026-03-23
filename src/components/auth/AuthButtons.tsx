
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/sign-in">
        <Button variant="ghost" size="sm">Sign In</Button>
      </Link>
      <Link to="/sign-up">
        <Button className="bg-brand-gold hover:bg-brand-gold/90 text-white" size="sm">Sign Up</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
