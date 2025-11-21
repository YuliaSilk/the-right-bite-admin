import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext"; // Додай AuthProvider
import AdminLogin from "./pages/LoginPage"; // ✅ ДОДАЙ ЦЕЙ ІМПОРТ
import ProtectedRoute from "./hooks/ProtectedRoute"; // ✅ Додай Protected Route
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
     {/* Login Route - публічний */}
     <Route
      path="/admin/login"
      element={<AdminLogin />}
     />

     {/* RedirectRoot to Dashboard */}
     <Route
      path="/"
      element={
       <Navigate
        to="/admin/dashboard"
        replace
       />
      }
     />

     {/* Protected Admin Routes */}
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

// import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// import AdminLayout from "./pages/AdminLayout";
// import DashboardPage from "./pages/DashboardPage";
// import OrdersPage from "./pages/OrdersPage";
// import ProductsPage from "./pages/SalesPage";
// import CustomersPage from "./pages/CustomerPage";

// function App() {
//  return (
//   <BrowserRouter>
//    <Routes>
//     <Route
//      path="/admin/login"
//      element={<AdminLogin />}
//     />
//     <Route
//      path="/"
//      element={
//       <Navigate
//        to="/admin/dashboard"
//        replace
//       />
//      }
//     />

//     <Route
//      path="/admin"
//      element={<AdminLayout />}
//     >
//      <Route
//       index
//       element={
//        <Navigate
//         to="dashboard"
//         replace
//        />
//       }
//      />
//      <Route
//       path="dashboard"
//       element={<DashboardPage />}
//      />
//      <Route
//       path="orders"
//       element={<OrdersPage />}
//      />
//      <Route
//       path="products"
//       element={<ProductsPage />}
//      />{" "}
//      {/* ✅ Розкоментуємо маршрут */}
//      <Route
//       path="customers"
//       element={<CustomersPage />}
//      />{" "}
//      {/* ✅ Розкоментуємо маршрут */}
//     </Route>
//    </Routes>
//   </BrowserRouter>
//  );
// }

// export default App;
