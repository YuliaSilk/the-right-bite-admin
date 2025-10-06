import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api/ordersAPI";

export default function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-addition-text text-center py-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-addition-text text-center py-10">No orders found</p>;
  }

  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div key={order.id} className="border-b border-gray-200 py-2 flex justify-between">
          <span>Order #{order.id}</span>
          <span className="text-sm">{order.orderStatus}</span>
        </div>
      ))}
    </div>
  );
}