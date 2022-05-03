import React,{useState,useEffect} from "react";
import { useMediaQuery } from 'react-responsive'

export const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [showSmallSidebar, setShowSmallSidebar] = useState(false)
  const [user, setUser] = useState([])
  const isMobile  = useMediaQuery({ query: '(max-width: 1024px)' })
  const [mobileNav, setMobileNav] = useState(isMobile)
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    setMobileNav(isMobile)
  }, [isMobile]);
  return (
    <AppContext.Provider value={{
     showSmallSidebar,
     setShowSmallSidebar,
     user,
     setUser,
     mobileNav,
     setMobileNav,
     showNav,
     setShowNav,
     isMobile
    }}>
      {children}
    </AppContext.Provider>
  );
}