import React, { useState } from 'react';
import { Table, Tag, Input, Select, Button, DatePicker, Card, Space, Tabs, Dropdown, message } from 'antd';
import { SearchOutlined, FilterOutlined, SyncOutlined, PlusOutlined, MoreOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const { RangePicker } = DatePicker;

// const columns = [
//   {
//     title: 'Order Id',
//     dataIndex: 'orderId',
//     key: 'orderId',
//     render: (text) => <a className="text-main-text font-semibold">{text}</a>,
//   },
//   {
//     title: 'Product',
//     dataIndex: 'product',
//     key: 'product',
//     render: (text, record) => (
//         // Відображення назви продукту та кількості (qty)
//         <div className="flex flex-col">
//             <span className="text-main-text font-semibold">{text}</span>
//             <span className="text-addition-text text-xs">{record.qty}</span>
//         </div>
//     )
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     key: 'date',
//     sorter: (a, b) => new Date(a.date) - new Date(b.date),
//   },
//   {
//     title: 'Total',
//     dataIndex: 'total',
//     key: 'total',
//     render: (value) => <span className="font-semibold">{`€${value.toFixed(2)}`}</span>,
//   },
//   {
//     title: 'Payment',
//     dataIndex: 'payment',
//     key: 'payment',
//     render: (payment) => {
//         const color = payment === 'Paid' ? 'success' : 'red';
//         return <Tag color={color} className="font-semibold">{payment}</Tag>;
//     }
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//     render: (status) => {
//       let color;
//       if (status === 'Delivered') {
//         color = 'success';
//       } else if (status === 'Pending') {
//         color = 'warning';
//       } else if (status === 'Cancelled') {
//         color = 'red';
//       } else {
//         color = 'blue';
//       }
//       return <Tag color={color} key={status} className="font-semibold">{status}</Tag>;
//     },
//   },
//   {
//     title: '', 
//     key: 'action',
//     align: 'right',
//     render: () => (
//       <Dropdown
//         menu={{ 
//             items: [
//                 { key: '1', label: 'View Details' },
//                 { key: '2', label: 'Send Invoice' },
//                 { key: '3', label: 'Cancel Order', danger: true },
//             ] 
//         }}
//         placement="bottomRight"
//       >
//         <Button type="text" icon={<MoreOutlined className="text-xl" />} />
//       </Dropdown>
//     ),
//   },
// ];


function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

const token = import.meta.env.VITE_API_TOKEN;
const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <a className="text-main-text font-semibold">{text}</a>,
    },
    {
      title: 'Products',
      dataIndex: 'items',
      key: 'items',
      render: (items) => {
        if (!items || items.length === 0) return <i>No items</i>;
        return (
          <div className="flex flex-col gap-1">
            {items.map((item, idx) => (
              <div key={idx}>
                <strong>{item.productName}</strong> × {item.quantity}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => (
        <span className="font-semibold">{`€${Number(value).toFixed(2)}`}</span>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment) => {
        const color = payment === 'Paid' ? 'success' : 'red';
        return (
          <Tag color={color} className="font-semibold">
            {payment}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        if (status === 'Delivered') color = 'success';
        else if (status === 'Pending') color = 'warning';
        else if (status === 'Cancelled') color = 'red';
        else color = 'blue';

        return (
          <Tag color={color} key={status} className="font-semibold">
            {status}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: '1', label: 'View Details' },
              { key: '2', label: 'Send Invoice' },
              { key: '3', label: 'Cancel Order', danger: true },
            ],
          }}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined className="text-xl" />} />
        </Dropdown>
      ),
    },
  ];
    useEffect(() => {
        const fetchOrders = async () => {
          setLoading(true);
          try {
            const res = await fetch('https://right-bite-store.onrender.com/api/v1/admin/orders', {
              headers: { Authorization: `Bearer ${token}` },
            });
      
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      
            const data = await res.json();
            console.log('Orders from API:', data);
      
            const formatted = data.map(order => {
              const firstProduct = order.items?.[0];
              const productName = firstProduct ? firstProduct.productName : '—';
              const qty = order.items?.length > 1 ? `+${order.items.length - 1}` : '+0';
              const date = new Date(order.createdAt).toLocaleDateString();
              const total = order.totalPrice ?? 0;
              const payment = order.user ? 'Paid' : 'Unpaid';
              const status =
                order.orderStatus === 'CREATED'
                  ? 'Pending'
                  : order.orderStatus === 'SHIPPED'
                  ? 'Shipped'
                  : order.orderStatus === 'DELIVERED'
                  ? 'Delivered'
                  : 'Cancelled';
      
              return {
                key: order.id,
                orderId: `ID-${order.id}`,
                items: order.items || [],
                product: productName,
                qty,
                date,
                total,
                payment,
                status,
              };
            });
      
            setOrders(formatted);
          } catch (error) {
            console.error('Error fetching orders:', error);
            message.error('Failed to load orders');
          } finally {
            setLoading(false);
          }
        };
        fetchOrders();
      }, []);

    return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-main-text mb-6">Orders Management</h1>

      <Card className="rounded-xl shadow-lg border-none" bodyStyle={{ padding: '0px' }}>
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-stroke-table/50">
          <h2 className="text-xl font-secondary font-semibold text-main-text">Order List</h2>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} className="rounded-lg font-semibold">
              Add Order
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          className="rounded-b-xl"
        />
      </Card>
    </div>
  );
}

export default OrdersPage;
