import { apiFetch } from "./apiClient";

export const getAllOrders = () => apiFetch("/admin/orders");
export const getOrderById = (id) => apiFetch(`/admin/order/${id}`);
export const createOrder = (data) =>
  apiFetch("/order/create", { method: "POST", body: JSON.stringify(data) });

export const getTotalCustomers = () => apiFetch("/admin/total-customers");
export const getTotalOrders = () => apiFetch("/admin/total-orders");
export const getTotalSales = () => apiFetch("/admin/total-sales");

export const getSalesStatistics = (period = "all") => 
    apiFetch(`/admin/sales-statistics?period=${period}`);


