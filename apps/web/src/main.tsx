import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env");
}
if (!CONVEX_URL) {
  throw new Error("Missing VITE_CONVEX_URL in .env");
}

const convex = new ConvexReactClient(CONVEX_URL);

const router = createRouter({
  routeTree,
  context: {
    convex,
    auth: { isSignedIn: false, isLoaded: false, userId: null },
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return (
    <RouterProvider
      router={router}
      context={{
        convex,
        auth: {
          isSignedIn: auth.isSignedIn ?? false,
          isLoaded: auth.isLoaded,
          userId: auth.userId ?? null,
        },
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <InnerApp />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
);
