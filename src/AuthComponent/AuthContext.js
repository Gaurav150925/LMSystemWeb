import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    debugger
    const storedToken = localStorage.getItem('AuthToken');

    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken); // decode the JWT
        
        setUser({
          username: decoded.username,
          role: decoded.role
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('AuthToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
