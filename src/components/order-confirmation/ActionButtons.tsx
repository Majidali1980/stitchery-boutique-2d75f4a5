
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button asChild variant="outline" size="lg" className="gap-2">
        <Link to="/products">
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </Button>
      <Button asChild className="bg-brand-gold hover:bg-brand-gold/90" size="lg" className="gap-2">
        <Link to="/">
          <Home size={18} />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default ActionButtons;
