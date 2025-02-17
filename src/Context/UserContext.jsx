import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check localStorage for the token
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setUserData(storedToken);
    }
  }, []);

  // Listen for changes in localStorage and update state accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('userToken');
      if (storedToken) {
        setUserData(storedToken);
      } else {
        setUserData(null); // If token is removed, reset user data
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
