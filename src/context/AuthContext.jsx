import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [user, setUser] = useState(null);

 useEffect(() => {
  // Перевіряємо токен при завантаженні
  const token = localStorage.getItem("accessToken");
  const email = localStorage.getItem("adminEmail");

  if (token && email) {
   setIsAuthenticated(true);
   setUser({email});
  }
 }, []);

 const login = (accessToken, refreshToken, email) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("adminEmail", email);

  setIsAuthenticated(true);
  setUser({email});
 };

 const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("adminEmail");

  setIsAuthenticated(false);
  setUser(null);
  window.location.href = "/admin/login";
 };

 return <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
