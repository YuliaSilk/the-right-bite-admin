import React, { useState } from 'react';
import { Table, Tag, Input, Select, Button, DatePicker, Card, Space, Tabs, Dropdown } from 'antd';
import { SearchOutlined, FilterOutlined, SyncOutlined, PlusOutlined, MoreOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
// import DashboardCard from '../components/dashboard/DashboardCard'; // Перевикористовуємо картку з дашборду

const { RangePicker } = DatePicker;

// ==========================================
// 1. ДАНІ ДЛЯ КАРТОК МЕТРИК У ВЕРХНІЙ ЧАСТИНІ
// ==========================================
const orderMetrics = [
  { 
    title: 'Total Orders', 
    value: '1,024', 
    change: '↑18.4%', 
    icon: <SyncOutlined className="text-xl text-primary" />, 
    bgColor: 'bg-primary/10' // Використовуємо Tailwind колір для фону
  },
  { 
    title: 'New Orders', 
    value: '137', 
    change: '↑11.9%', 
    icon: <PlusOutlined className="text-xl text-warning" />, 
    bgColor: 'bg-yellow-100'
  },
  { 
    title: 'Completed Orders', 
    value: '822', 
    change: '↑36.2%', 
    icon: <DownloadOutlined className="text-xl text-success" />, 
    bgColor: 'bg-green-100'
  },
  { 
    title: 'Canceled Orders', 
    value: '65', 
    change: '↓4.5%', 
    icon: <ShareAltOutlined className="text-xl text-red" />, 
    bgColor: 'bg-red-100'
  },
];

// ==========================================
// 2. СТАТИЧНІ ДАНІ ДЛЯ ТАБЛИЦІ
// ==========================================
const mockOrders = [
  { key: '1', orderId: 'ID-393344', product: 'Tomato 3kg', qty: '+7', date: '27.07.2025', total: 78.00, payment: 'Paid', status: 'Delivered' },
  { key: '2', orderId: 'ID-264589', product: 'Avocado 6pc', qty: '+9', date: '27.07.2025', total: 95.00, payment: 'Paid', status: 'Shipped' },
  { key: '3', orderId: 'ID-948657', product: 'Mango 5pc', qty: '+3', date: '27.07.2025', total: 144.00, payment: 'Unpaid', status: 'Pending' },
  { key: '4', orderId: 'ID-456897', product: 'Broccoli 4pc', qty: '+2', date: '27.07.2025', total: 55.00, payment: 'Paid', status: 'Delivered' },
  { key: '5', orderId: 'ID-849657', product: 'Tomato 10kg', qty: '+8', date: '27.07.2025', total: 284.00, payment: 'Paid', status: 'Delivered' },
  { key: '6', orderId: 'ID-515685', product: 'Apple 4kg', qty: '+3', date: '26.07.2025', total: 85.00, payment: 'Paid', status: 'Delivered' },
  { key: '7', orderId: 'ID-393344', product: 'Spinach 500g', qty: '+7', date: '26.07.2025', total: 139.00, payment: 'Unpaid', status: 'Cancelled' },
];


// ==========================================
// 3. КОЛОНКИ ТАБЛИЦІ
// ==========================================
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

// Елементи для випадаючого меню "More Action"
const moreActionItems = [
    { key: 'export', label: 'Export to CSV', icon: <DownloadOutlined /> },
    { key: 'share', label: 'Share Report', icon: <ShareAltOutlined /> },
];


// ==========================================
// 4. КОМПОНЕНТ СТОРІНКИ
// ==========================================
function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Фільтрування даних за активною вкладкою (поки статичне)
  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return order.status === 'Delivered';
    if (activeTab === 'pending') return order.status === 'Pending';
    if (activeTab === 'canceled') return order.status === 'Cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-main-text mb-6">
        Orders Management
      </h1>

      {/* 1. Секція Карток Метрик (верхній ряд) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {orderMetrics.map((metric) => (
          // Використовуємо інший Card, щоб відповідати макету (без кнопки Details)
          <Card key={metric.title} className="rounded-xl shadow-lg border-none" bodyStyle={{ padding: '20px' }}>
              <div className="flex justify-between items-start">
                  <div>
                      <p className="text-addition-text text-sm">{metric.title}</p>
                      <h2 className="text-2xl font-bold text-main-text mt-1">{metric.value}</h2>
                      <span className={`text-sm ${metric.change.startsWith('↑') ? 'text-success' : 'text-red'} font-semibold`}>
                        {metric.change}
                      </span>
                  </div>
                  {/* Кнопка "..." */}
                  <Dropdown 
                      menu={{ items: [{ key: '1', label: 'View Details' }] }} 
                      placement="bottomRight"
                  >
                      <Button type="text" icon={<MoreOutlined className="text-lg" />} />
                  </Dropdown>
              </div>
          </Card>
        ))}
      </div>

      {/* 2. Секція "Order List" з Таблицею */}
      <Card className="rounded-xl shadow-lg border-none" bodyStyle={{ padding: '0px' }}>
        
        {/* Хедер Таблиці: Заголовок та Кнопки Дій */}
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-stroke-table/50">
            <h2 className="text-xl font-secondary font-semibold text-main-text">Order List</h2>
            <Space>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    className="rounded-lg font-semibold"
                >
                    Add Order
                </Button>
                <Dropdown menu={{ items: moreActionItems }} placement="bottomRight">
                    <Button 
                        icon={<MoreOutlined />}
                        className="rounded-lg font-semibold"
                    >
                        More Action
                    </Button>
                </Dropdown>
            </Space>
        </div>

        {/* Секція Фільтрів: Вкладки, Пошук та Дата */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            
            {/* Вкладки (Tabs) */}
            <Tabs 
                defaultActiveKey="all" 
                onChange={setActiveTab}
                items={[
                    { key: 'all', label: 'ALL ORDER' },
                    { key: 'completed', label: 'COMPLETED' },
                    { key: 'pending', label: 'PENDING' },
                    { key: 'canceled', label: 'CANCELED' },
                ]}
                className="order-tabs"
            />
            
            {/* Пошук та Дата */}
            <Space size="small">
                <Button icon={<FilterOutlined />} className="rounded-lg border-stroke-table hover:border-accent" />
                <Input 
                    placeholder="Search" 
                    prefix={<SearchOutlined className="text-addition-text" />}
                    className="rounded-lg w-32"
                />
                <RangePicker className="rounded-lg w-48" />
                <Button icon={<DownloadOutlined />} className="rounded-lg border-stroke-table hover:border-accent" />
                <Button icon={<ShareAltOutlined />} className="rounded-lg border-stroke-table hover:border-accent" />
            </Space>
        </div>


        {/* Таблиця */}
        <Table 
          columns={columns} 
          dataSource={filteredOrders} 
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          className="rounded-b-xl"
        />
      </Card>
      
      {/* Кастомні стилі для вкладок antd, щоб вони відповідали дизайну */}
      <style>{`
        .order-tabs .ant-tabs-nav-list {
            gap: 1.5rem; /* Збільшуємо відстань між вкладками */
        }
        .order-tabs .ant-tabs-tab {
            padding: 0;
            font-weight: 600;
            color: var(--addition-text); /* Текст неактивних вкладок */
        }
        .order-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: var(--accent-color) !important; /* Активна вкладка - зелений */
        }
        .order-tabs .ant-tabs-ink-bar {
            background: var(--accent-color); /* Індикатор - зелений */
            height: 3px;
        }
        /* Встановлюємо змінну CSS для використання в тегах */
        :root {
            --success: #234d2e;
            --red: #FF4D4F;
            --warning: #FAAD14;
        }
      `}</style>

    </div>
  );
}

export default OrdersPage;
