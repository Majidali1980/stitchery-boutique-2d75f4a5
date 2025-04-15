
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Updated to use the environment variable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_bW9yZS12ZXJ2ZXQtMi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Add custom head elements including Google verification
const headElement = document.querySelector('head');
if (headElement) {
  const metaTag = document.createElement('meta');
  metaTag.name = 'google-site-verification';
  metaTag.content = '88qyDdM6JKgUKA1Hu52ZiVJhreP079-Du5FhSJGc8aU';
  headElement.appendChild(metaTag);
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
