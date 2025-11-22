import {useAuth} from "../hooks/useAuth";

const ProtectedRoute = ({children}) => {
 const {isAuthenticated} = useAuth();

 if (!isAuthenticated) {
  window.location.href = "/admin/login";
  return null;
 }

 return children;
};

export default ProtectedRoute;
