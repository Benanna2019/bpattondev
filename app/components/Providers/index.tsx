import * as React from "react";
// import { FathomProvider } from "./Fathom";
import { SEO } from "./SEO";
import { Toast } from "./Toaster";

interface Props {
  children?: any;
  pageProps: any;
}

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (val: boolean) => {},
};

export const GlobalNavigationContext = React.createContext(globalNavigationContext);

export function Providers({ children }: Props) {
  const initialState = {
    isOpen: false,
    setIsOpen,
  };

  const [state, setState] = React.useState(initialState);

  function setIsOpen(isOpen: any) {
    return setState({ ...state, isOpen });
  }

  return (
    <>
      <SEO />
      <Toast />

      <GlobalNavigationContext.Provider value={state}>{children}</GlobalNavigationContext.Provider>
    </>
  );
}
