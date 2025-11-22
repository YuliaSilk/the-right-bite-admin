import {useState, useEffect} from "react";
import {AuthContext} from "./auth";

export const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  checkAuth();
 }, []);

 const checkAuth = () => {
  const token = localStorage.getItem("accessToken");
  const email = localStorage.getItem("adminEmail");

  if (token && email) {
   setIsAuthenticated(true);
   setUser({email});
  } else {
   setIsAuthenticated(false);
   setUser(null);
  }

  setLoading(false);
 };

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

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
   </div>
  );
 }

 return (
  <AuthContext.Provider value={{isAuthenticated, user, login, logout, checkAuth}}>{children}</AuthContext.Provider>
 );
};
