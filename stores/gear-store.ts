import { create } from "zustand";
import { Listing } from "@prisma/client";

interface GearState {
  listings: Listing[];
  watchlist: Listing[];
  searchQuery: string;
  setListings: (listings: Listing[]) => void;
  addToWatchlist: (listing: Listing) => void;
  removeFromWatchlist: (listingId: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useGearStore = create<GearState>((set) => ({
  listings: [],
  watchlist: [],
  searchQuery: "",
  setListings: (listings) => set({ listings }),
  addToWatchlist: (listing) =>
    set((state) => ({
      watchlist: [...state.watchlist, listing],
    })),
  removeFromWatchlist: (listingId) =>
    set((state) => ({
      watchlist: state.watchlist.filter((item) => item.id !== listingId),
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
