import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import AdminLayout from './pages/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/SalesPage'; // ✅ Додаємо імпорт ProductsPage
import CustomersPage from './pages/CustomerPage';
import './App.css'

function App() {



  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />  {/* ✅ Розкоментуємо маршрут */}
            <Route path="customers" element={<CustomersPage />} />  {/* ✅ Розкоментуємо маршрут */}
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
