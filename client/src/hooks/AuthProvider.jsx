import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../constants/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState([])

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${URL}/check-auth`, { withCredentials: true });
      setIsAuthenticated(true);
      setUser(res.data.user)
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null)
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logOut = async () => {
    try {
      await axios.post(`${URL}/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
