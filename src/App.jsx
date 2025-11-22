import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import AdminLogin from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminLayout from "./pages/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/SalesPage";
import CustomersPage from "./pages/CustomerPage";

function App() {
 return (
  <AuthProvider>
   <BrowserRouter>
    <Routes>
     <Route
      path="/"
      element={
       <Navigate
        to="/admin/login"
        replace
       />
      }
     />
     {/* <Route
      path="/"
      element={
       <Navigate
        to="/admin/login"
        replace
       /> */}
     <Route
      path="/admin/login"
      element={<AdminLogin />}
     />

     <Route
      path="/admin"
      element={
       <ProtectedRoute>
        <AdminLayout />
       </ProtectedRoute>
      }
     >
      <Route
       index
       element={
        <Navigate
         to="dashboard"
         replace
        />
       }
      />
      <Route
       path="dashboard"
       element={<DashboardPage />}
      />
      <Route
       path="orders"
       element={<OrdersPage />}
      />
      <Route
       path="products"
       element={<ProductsPage />}
      />
      <Route
       path="customers"
       element={<CustomersPage />}
      />
     </Route>
    </Routes>
   </BrowserRouter>
  </AuthProvider>
 );
}

export default App;
