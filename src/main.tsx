
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx';
import './index.css';

// IMPORTANT: Replace this with your actual Clerk publishable key
const PUBLISHABLE_KEY = "YOUR_ACTUAL_CLERK_PUBLISHABLE_KEY";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please visit https://dashboard.clerk.com to create an account and obtain your key.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
