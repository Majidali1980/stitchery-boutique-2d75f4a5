
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLoginInfo } from "@/data/admin-info";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { Shield } from "lucide-react";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check credentials against admin info
    if (email === adminLoginInfo.email && password === adminLoginInfo.password) {
      // Store admin status in both localStorage (persistent) and sessionStorage (session only)
      localStorage.setItem("isAdmin", "true");
      sessionStorage.setItem("isAdmin", "true");
      
      toast({
        title: "Success",
        description: "You have successfully logged in as admin",
      });
      
      // Redirect to the original requested page or admin dashboard
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-brand-gold" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isSignedIn ? (
            <div className="text-center p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <p className="mb-4 text-sm">You need to sign in with your account first</p>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In First</Button>
              </SignInButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-gold hover:bg-brand-gold/90"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                    Signing in...
                  </span>
                ) : "Sign in as Admin"}
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 w-full">
            This area is restricted to authorized personnel only
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
