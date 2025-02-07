import {createContext, useContext,useState,useEffect} from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const value={}
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
