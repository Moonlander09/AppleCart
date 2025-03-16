"use client";
import { getProfileHandler } from "@/lib/axiosHandler";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);


  
  const fetchUser = async () => {
    try {
      const { user } = await getProfileHandler();
      setUserData(user);
    } catch (error) {
      setUserData(null);
     
    }
  };

  
  useEffect(() => {
  
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
