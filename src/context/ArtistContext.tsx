import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type Artist = {
  bgImage: string;
  name: string;
  followers: number;
  id: string;
};

type ArtistContextType = {
  artist: Artist | undefined;
  setArtist: Dispatch<SetStateAction<Artist | undefined>>;
};

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

type ArtistContextProviderType = {
  children: React.ReactNode;
};

export function ArtistContextProvider({ children }: ArtistContextProviderType) {
  const [artist, setArtist] = useState<Artist | undefined>(undefined);

  return (
    <ArtistContext.Provider value={{ artist, setArtist }}>
      {children}
    </ArtistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useArtist = () => {
  const ctx = useContext(ArtistContext);

  if (!ctx) {
    throw new Error("useArtist must be used within ArtistContextProvider!");
  }

  return ctx;
};
