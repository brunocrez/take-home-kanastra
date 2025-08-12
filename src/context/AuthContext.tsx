import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
  accessToken: undefined | string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderType = {
  children: React.ReactNode;
};

type Response = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export function AuthContextProvider({ children }: AuthContextProviderType) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const fetch = async (): Promise<void> => {
    try {
      const response = await axios.post<Response>(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("erro ao obter token!", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthContextProvider!");
  }

  return ctx;
};
