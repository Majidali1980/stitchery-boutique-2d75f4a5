
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button asChild variant="outline" size="lg">
        <Link to="/products">Continue Shopping</Link>
      </Button>
      <Button asChild className="bg-brand-gold hover:bg-brand-gold/90" size="lg">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default ActionButtons;
