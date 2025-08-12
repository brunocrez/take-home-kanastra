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
import NotFoundPage from "./pages/NotFound.tsx";
import ErrorPage from "./pages/Error.tsx";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    errorElement: <NotFoundPage />,
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
  {
    path: "error",
    Component: ErrorPage,
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
