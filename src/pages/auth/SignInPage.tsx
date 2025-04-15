
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { Textarea } from "@/components/ui/textarea";

const SignInPage = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const { toast } = useToast();
  const { isSignedIn } = useAuth();

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const handleSaveNote = () => {
    localStorage.setItem("adminNote", adminNote);
    toast({
      title: "Note saved",
      description: "Your admin note has been saved locally",
    });
  };

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
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Sign in to your account using Clerk authentication
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
                <SignIn />
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-500 w-full"
                onClick={handleToggleNotes}
              >
                {showNotes ? "Hide Admin Notes" : "Admin Notes"}
              </Button>
              
              {showNotes && (
                <div className="mt-3 space-y-3">
                  <Textarea
                    placeholder="Store admin details here for your reference..."
                    className="min-h-[100px]"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleSaveNote}
                  >
                    Save Note
                  </Button>
                  <p className="text-xs text-gray-500 italic">
                    This note is stored only on your device and is not sent to any server.
                  </p>
                </div>
              )}
            </div>
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
