import React, {useState, useEffect} from "react";
import {Table, Tag, Button, Card, Space, Dropdown, message} from "antd";
import {PlusOutlined, MoreOutlined} from "@ant-design/icons";
import {getAllOrders} from "../api/ordersAPI";

function OrdersPage() {
 const [orders, setOrders] = useState([]);
 const [loading, setLoading] = useState(false);

 const columns = [
  {
   title: "Order ID",
   dataIndex: "orderId",
   key: "orderId",
   render: (text) => <a className="text-main-text font-semibold">{text}</a>,
  },
  {
   title: "Customer",
   dataIndex: "customer",
   key: "customer",
   render: (customer) => customer || <i className="text-gray-400">Guest</i>,
  },
  {
   title: "Products",
   dataIndex: "items",
   key: "items",
   render: (items) => {
    if (!items || items.length === 0) return <i>No items</i>;
    return (
     <div className="flex flex-col gap-1">
      {items.slice(0, 2).map((item, idx) => (
       <div
        key={idx}
        className="text-sm"
       >
        <strong>{item.productName}</strong> × {item.quantity}
       </div>
      ))}
      {items.length > 2 && <span className="text-xs text-gray-500">+{items.length - 2} more</span>}
     </div>
    );
   },
  },
  {
   title: "Date",
   dataIndex: "date",
   key: "date",
   sorter: (a, b) => new Date(a.rawDate) - new Date(b.rawDate),
  },
  {
   title: "Total",
   dataIndex: "total",
   key: "total",
   render: (value) => <span className="font-semibold">{`€${Number(value).toFixed(2)}`}</span>,
   sorter: (a, b) => a.total - b.total,
  },
  {
   title: "Status",
   dataIndex: "status",
   key: "status",
   render: (status) => {
    let color;
    if (status === "Delivered") color = "success";
    else if (status === "Pending") color = "warning";
    else if (status === "Cancelled") color = "red";
    else color = "blue";

    return (
     <Tag
      color={color}
      key={status}
      className="font-semibold"
     >
      {status}
     </Tag>
    );
   },
   filters: [
    {text: "Pending", value: "Pending"},
    {text: "Shipped", value: "Shipped"},
    {text: "Delivered", value: "Delivered"},
    {text: "Cancelled", value: "Cancelled"},
   ],
   onFilter: (value, record) => record.status === value,
  },
  {
   title: "",
   key: "action",
   align: "right",
   render: () => (
    <Dropdown
     menu={{
      items: [
       {key: "1", label: "View Details"},
       {key: "2", label: "Send Invoice"},
       {key: "3", label: "Cancel Order", danger: true},
      ],
     }}
     placement="bottomRight"
    >
     <Button
      type="text"
      icon={<MoreOutlined className="text-xl" />}
     />
    </Dropdown>
   ),
  },
 ];

 useEffect(() => {
  fetchOrders();
 }, []);

 const fetchOrders = async () => {
  setLoading(true);
  try {
   const data = await getAllOrders();
   console.log("Orders from API:", data);

   const formatted = data.map((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
     day: "2-digit",
     month: "short",
     year: "numeric",
    });

    const customer = order.orderDeliveryDetails
     ? `${order.orderDeliveryDetails.firstname} ${order.orderDeliveryDetails.lastname}`
     : order.user?.email || "Guest";

    const statusMap = {
     CREATED: "Pending",
     SHIPPED: "Shipped",
     DELIVERED: "Delivered",
     CANCELLED: "Cancelled",
    };
    const status = statusMap[order.orderStatus] || "Pending";

    return {
     key: order.id,
     orderId: `#${order.id}`,
     customer,
     items: order.items || [],
     date,
     rawDate: order.createdAt,
     total: order.totalPrice ?? 0,
     status,
     deliveryDetails: order.orderDeliveryDetails,
    };
   });

   setOrders(formatted);
  } catch (error) {
   console.error("Error fetching orders:", error);
   message.error("Failed to load orders. " + error.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex justify-between items-center">
    <h1 className="text-3xl font-secondary font-bold text-main-text">Orders Management</h1>
    <Button
     type="primary"
     icon={<PlusOutlined />}
     className="rounded-lg font-semibold"
    >
     Add Order
    </Button>
   </div>

   <Card
    className="rounded-xl shadow-lg border-none"
    bodyStyle={{padding: "0px"}}
   >
    <div className="p-4 md:p-6 flex justify-between items-center border-b border-stroke-table/50">
     <h2 className="text-xl font-secondary font-semibold text-main-text">Order List ({orders.length})</h2>
     <Space>
      <Button
       onClick={fetchOrders}
       loading={loading}
       className="rounded-lg"
      >
       Refresh
      </Button>
     </Space>
    </div>

    <Table
     columns={columns}
     dataSource={orders}
     rowKey="key"
     loading={loading}
     pagination={{
      pageSize: 10,
      position: ["bottomCenter"],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
     }}
     className="rounded-b-xl"
     scroll={{x: 1000}}
    />
   </Card>
  </div>
 );
}

export default OrdersPage;
