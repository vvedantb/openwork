import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("Missing VITE_CONVEX_URL in .env");
}

const convex = new ConvexReactClient(CONVEX_URL);

const router = createRouter({
  routeTree,
  context: {
    convex,
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexProvider>
  </React.StrictMode>,
);
