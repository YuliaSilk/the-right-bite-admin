import React, { useState } from 'react';
import { Table, Tag, Input, Select, Button, DatePicker, Card, Space, Tabs, Dropdown, message } from 'antd';
import { SearchOutlined, FilterOutlined, SyncOutlined, PlusOutlined, MoreOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
// import DashboardCard from '../components/dashboard/DashboardCard'; // Перевикористовуємо картку з дашборду

const { RangePicker } = DatePicker;



// const orderMetrics = [
//   { 
//     title: 'Total Orders', 
//     value: '1,024', 
//     change: '↑18.4%', 
//     icon: <SyncOutlined className="text-xl text-primary" />, 
//     bgColor: 'bg-primary/10' // Використовуємо Tailwind колір для фону
//   },
//   { 
//     title: 'New Orders', 
//     value: '137', 
//     change: '↑11.9%', 
//     icon: <PlusOutlined className="text-xl text-warning" />, 
//     bgColor: 'bg-yellow-100'
//   },
//   { 
//     title: 'Completed Orders', 
//     value: '822', 
//     change: '↑36.2%', 
//     icon: <DownloadOutlined className="text-xl text-success" />, 
//     bgColor: 'bg-green-100'
//   },
//   { 
//     title: 'Canceled Orders', 
//     value: '65', 
//     change: '↓4.5%', 
//     icon: <ShareAltOutlined className="text-xl text-red" />, 
//     bgColor: 'bg-red-100'
//   },
// ];


// const mockOrders = [
//   { key: '1', orderId: 'ID-393344', product: 'Tomato 3kg', qty: '+7', date: '27.07.2025', total: 78.00, payment: 'Paid', status: 'Delivered' },
//   { key: '2', orderId: 'ID-264589', product: 'Avocado 6pc', qty: '+9', date: '27.07.2025', total: 95.00, payment: 'Paid', status: 'Shipped' },
//   { key: '3', orderId: 'ID-948657', product: 'Mango 5pc', qty: '+3', date: '27.07.2025', total: 144.00, payment: 'Unpaid', status: 'Pending' },
//   { key: '4', orderId: 'ID-456897', product: 'Broccoli 4pc', qty: '+2', date: '27.07.2025', total: 55.00, payment: 'Paid', status: 'Delivered' },
//   { key: '5', orderId: 'ID-849657', product: 'Tomato 10kg', qty: '+8', date: '27.07.2025', total: 284.00, payment: 'Paid', status: 'Delivered' },
//   { key: '6', orderId: 'ID-515685', product: 'Apple 4kg', qty: '+3', date: '26.07.2025', total: 85.00, payment: 'Paid', status: 'Delivered' },
//   { key: '7', orderId: 'ID-393344', product: 'Spinach 500g', qty: '+7', date: '26.07.2025', total: 139.00, payment: 'Unpaid', status: 'Cancelled' },
// ];


const columns = [
  {
    title: 'Order Id',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (text) => <a className="text-main-text font-semibold">{text}</a>,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (text, record) => (
        // Відображення назви продукту та кількості (qty)
        <div className="flex flex-col">
            <span className="text-main-text font-semibold">{text}</span>
            <span className="text-addition-text text-xs">{record.qty}</span>
        </div>
    )
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
    render: (value) => <span className="font-semibold">{`€${value.toFixed(2)}`}</span>,
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    render: (payment) => {
        const color = payment === 'Paid' ? 'success' : 'red';
        return <Tag color={color} className="font-semibold">{payment}</Tag>;
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      if (status === 'Delivered') {
        color = 'success';
      } else if (status === 'Pending') {
        color = 'warning';
      } else if (status === 'Cancelled') {
        color = 'red';
      } else {
        color = 'blue';
      }
      return <Tag color={color} key={status} className="font-semibold">{status}</Tag>;
    },
  },
  {
    title: '', // Колонка для "..." кнопки
    key: 'action',
    align: 'right',
    render: () => (
      <Dropdown
        menu={{ 
            items: [
                { key: '1', label: 'View Details' },
                { key: '2', label: 'Send Invoice' },
                { key: '3', label: 'Cancel Order', danger: true },
            ] 
        }}
        placement="bottomRight"
      >
        <Button type="text" icon={<MoreOutlined className="text-xl" />} />
      </Dropdown>
    ),
  },
];

// // Елементи для випадаючого меню "More Action"
// const moreActionItems = [
//     { key: 'export', label: 'Export to CSV', icon: <DownloadOutlined /> },
//     { key: 'share', label: 'Share Report', icon: <ShareAltOutlined /> },
// ];



function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  // Фільтрування даних за активною вкладкою (поки статичне)
//   const filteredOrders = mockOrders.filter(order => {
//     if (activeTab === 'all') return true;
//     if (activeTab === 'completed') return order.status === 'Delivered';
//     if (activeTab === 'pending') return order.status === 'Pending';
//     if (activeTab === 'canceled') return order.status === 'Cancelled';
//     return true;
//   });
const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzU5Njc2OTIwLCJleHAiOjE3NTk2Nzg3MjAsInVzZXJuYW1lIjoiYWRtaW5AZW1haWwuY29tIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ0b2tlblR5cGUiOiJBQ0NFU1MifQ.3qDfbE7pz4rhvP1NKWM4CDSBLqLskTxex2ZB6QCD1p8';
  
 useEffect(() => {
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://right-bite-store.onrender.com/api/v1/admin/orders', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
const data =await res.json();
console.log('Orders from API:', data);
setOrders(data || []);    
        } catch (error){
            console.error('Error fetching orders:', error);
            message.error('Failed to load orders');
        } finally {
            setLoading(false)
        }
    };
    fetchOrders();
 }, []) 

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
