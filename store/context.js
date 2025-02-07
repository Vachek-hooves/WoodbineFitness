import {createContext, useContext,useState,useEffect} from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
