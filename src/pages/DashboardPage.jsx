// src/pages/DashboardPage.jsx
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { AreaChartOutlined, DollarCircleOutlined, UsergroupAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Дані для карток (поки статичні)
const dashboardMetrics = [
  { 
    title: 'Total Sales', 
    value: '€12k', 
    change: '+10.4%', 
    changeValue: '$447', 
    icon: <DollarCircleOutlined className="text-xl text-success" />, 
    bgColor: 'bg-green-100' 
  },
  { 
    title: 'Total Orders', 
    value: '1024', 
    change: '+22.8%', 
    changeValue: '$235', 
    icon: <ShoppingCartOutlined className="text-xl text-yellow-500" />, 
    bgColor: 'bg-yellow-100' 
  },
  { 
    title: 'Total Customers', 
    value: '772', 
    change: '-5.7%', 
    changeValue: '$235', 
    icon: <UsergroupAddOutlined className="text-xl text-red" />, 
    bgColor: 'bg-red-100' 
  },
];


function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Привітання */}
      <div className="mb-6">
        <h1 className="text-3xl font-secondary font-bold text-main-text">Welcome Back, Matt</h1>
        <p className="text-addition-text mt-1">
          Access your latest business metrics, manage customer orders, and keep your store running smoothly.
        </p>
      </div>

      {/* 1. Секція Карток Метрик */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardMetrics.map((metric) => (
          <DashboardCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* 2. Секція Статистики (Графік) */}
      <div className="bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-secondary font-semibold text-main-text mb-4">Statistic</h2>
        {/* Тут буде компонент для графіків та кнопок фільтрів */}
        <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          {/* Місце для Chart/Graph component */}
          <p className="text-addition-text">Placeholder for Chart Component</p>
        </div>
      </div>
      
    </div>
  );
}

export default DashboardPage;