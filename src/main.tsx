import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
