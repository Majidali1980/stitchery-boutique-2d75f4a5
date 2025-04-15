
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="container mx-auto py-16 px-4 relative">
      {/* Background logo with low opacity */}
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
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up for an account using Clerk authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignedIn ? (
              <div className="text-center p-4">
                <p className="mb-4">You are already signed in!</p>
                <Link to="/">
                  <Button>Go to Homepage</Button>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center">
                <SignUp />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-brand-gold hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
