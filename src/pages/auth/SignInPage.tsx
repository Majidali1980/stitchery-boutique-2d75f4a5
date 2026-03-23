
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SignInPage = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-16 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-5">
        <img 
          src="/lovable-uploads/87751383-1d75-422b-b342-1f320ffb7d64.png" 
          alt="MA Tailor Logo" 
          className="w-2/3 max-w-lg"
        />
      </div>
      
      <div className="max-w-md mx-auto relative z-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Sign in to your MA Tailor account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              toast({ title: "Coming soon", description: "Authentication will be available soon." });
            }}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold/90">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-brand-gold hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
