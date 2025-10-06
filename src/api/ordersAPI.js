import { apiFetch } from "./apiClient";

export const getAllOrders = () => apiFetch("/admin/orders");
export const getOrderById = (id) => apiFetch(`/admin/order/${id}`);
export const createOrder = (data) =>
  apiFetch("/order/create", { method: "POST", body: JSON.stringify(data) });

// Адмін
export const getTotalCustomers = () => apiFetch("/admin/total-customers");
export const getTotalOrders = () => apiFetch("/admin/total-orders");
export const getTotalSales = () => apiFetch("/admin/total-sales");
console.log ('sales:', getTotalSales.data )

// const API_BASE = "https://right-bite-store.onrender.com/api/v1";
// const TOKEN = import.meta.env.VITE_API_TOKEN;

// export const getAllOrders = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/order/all`, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//         },
//       });
  
//       if (!response.ok) throw new Error(`Error ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("❌ Error fetching orders:", error);
//       return [];
//     }
//   };

// export const getOrderById = async (orderId) => {
//   try {
//     const response = await fetch(`${API_BASE}/order/${orderId}`, {
//         headers: {
//             Authorization: `Bearer ${TOKEN}`,
//           },
//     });
//     if (!response.ok) throw new Error(`Error ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error("❌ Error fetching order details:", error);
//     return null;
//   }
// };

// export const createOrder = async (orderData) => {
//   try {
//     const response = await fetch(`${API_BASE}/order/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });

//     if (!response.ok) {
//       const errData = await response.json();
//       throw new Error(JSON.stringify(errData));
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("❌ Error creating order:", error);
//     throw error;
//   }
// };