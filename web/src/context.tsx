import { createContext, useContext, useState } from "react";

export type AppState = {
  state: {
    userAddress: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      userAddress: string;
    }>
  >;
};

const AppContext = createContext({} as AppState);

export const AppContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [state, setState] = useState({
    userAddress: "",
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
