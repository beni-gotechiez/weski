import React, { createContext, useContext, useState } from "react";
import { fetchHotels, Hotel } from "../api/hotels";
import { SearchParams } from "../types";

interface HotelsContextType {
  hotels: Hotel[];
  fetchAndSetHotels: () => Promise<void>;
}

const HotelsContext = createContext<HotelsContextType>({
  hotels: [],
  fetchAndSetHotels: async () => {},
});

export const HotelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [loading, setLoading] = useState<boolean>(false);


  const fetchAndSetHotels = async (searchParams: SearchParams) => {
	setSearchParams(searchParams);
	setLoading(true);
	setHotels([]);
    fetchHotels(searchParams, (hotelsData) => {
		setHotels((prev) => [...prev, ...hotelsData]);
		setLoading(false);
	  })
  };

  return (
    <HotelsContext.Provider value={{ hotels, fetchAndSetHotels, searchParams, loading }}>
      {children}
    </HotelsContext.Provider>
  );
};

export const useHotels = () => useContext(HotelsContext);
