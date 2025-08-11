import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ArtistContextProvider } from "./context/ArtistContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Home.tsx";
import ArtistPage from "./pages/Artist.tsx";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "artist",
    children: [
      {
        path: ":id",
        Component: ArtistPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ArtistContextProvider>
          <RouterProvider router={router} />
          <App />
        </ArtistContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
