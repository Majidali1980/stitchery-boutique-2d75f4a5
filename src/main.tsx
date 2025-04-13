
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx';
import './index.css';

// Clerk publishable key
// Replace with your actual publishable key once you create a Clerk account
const PUBLISHABLE_KEY = "REPLACE_WITH_YOUR_PUBLISHABLE_KEY";

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Please visit https://go.clerk.com/lovable to create an account.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
