import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
 const {isAuthenticated} = useAuth();

 if (!isAuthenticated) {
  window.location.href = "/admin/login";
  return null;
 }

 return children;
};

export default ProtectedRoute;
