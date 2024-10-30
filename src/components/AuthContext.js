import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (isAuthenticated) {
          const idTokenClaims = await getIdTokenClaims();
          setToken(idTokenClaims.__raw);
        }
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    fetchToken();
  }, [isAuthenticated, getIdTokenClaims]);
  console.log(token);
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export const useAuthToken = () => useContext(AuthContext);
