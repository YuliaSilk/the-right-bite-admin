import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Card } from 'antd';
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock дані для клієнтів: Нові клієнти (new) та Загальна база (total)
const mockData = [
  { month: "Jan", new: 50, total: 500 },
  { month: "Feb", new: 65, total: 565 },
  { month: "Mar", new: 40, total: 605 },
  { month: "Apr", new: 75, total: 680 },
  { month: "May", new: 90, total: 770 },
  { month: "Jun", new: 55, total: 825 },
  { month: "Jul", new: 80, total: 905 },
  { month: "Aug", new: 30, total: 935 },
  { month: "Sep", new: 85, total: 1020 },
  { month: "Oct", new: 70, total: 1090 },
  { month: "Nov", new: 45, total: 1135 },
  { month: "Dec", new: 60, total: 1195 },
];

const CustomersChart = () => {
  const [data, setData] = useState(mockData);
  const [loading, _] = useState(false);
  const [period, setPeriod] = useState('all');
  const [dateRange] = useState('01 Jan - 31 Dec 2025');

  useEffect(() => {
    // Логіка фільтрації
    if (period === '30days' || period === '7days' || period === '24hour') {
        setData(mockData.slice(-1));
    } else if (period === '12months') {
        setData(mockData);
    } else {
        setData(mockData);
    }
  }, [period]);

  const periodButtons = [
    { label: 'All Date', value: 'all' },
    { label: '12 Months', value: '12months' },
    { label: '30 Days', value: '30days' },
    { label: '7 Days', value: '7days' },
    { label: '24 Hour', value: '24hour' },
  ];

  const currentDataPoint = data[data.length - 1];
  const newCustomers = currentDataPoint?.new || 60;
  const totalCustomers = currentDataPoint?.total || 1195;

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading chart...</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Customer Acquisition</h2>
          <p className="text-sm text-gray-500">New vs Total Customer Base</p>
        </div>
        <button className="text-[#2c6e49] hover:text-[#2c6e49]/80 font-medium flex items-center gap-2">
          More
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-2">
          {periodButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setPeriod(btn.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === btn.value
                  ? 'bg-[#D2E7D3] text-[#2c6e49]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-sm text-gray-600">New Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-sm text-gray-600">Total Customers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#666" strokeWidth="1.5" />
            <path d="M3 8h14M7 3v2M13 3v2" stroke="#666" strokeWidth="1.5" />
          </svg>
          <span className="text-sm text-gray-700">{dateRange}</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-4 right-8 bg-white p-3 rounded-lg shadow-sm border border-gray-200 z-10 hidden lg:block">
          <div className="flex items-center gap-2 mb-1">
            <UsergroupAddOutlined className="text-indigo-500" />
            <span className="text-xs text-gray-500">New:</span>
            <span className="text-sm font-semibold text-gray-800">{newCustomers}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserOutlined className="text-pink-500" />
            <span className="text-xs text-gray-500">Total:</span>
            <span className="text-sm font-semibold text-gray-800">{totalCustomers}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value, name) => {
                  if (name === 'new') return [value, 'New Customers'];
                  if (name === 'total') return [value, 'Total Customers'];
                  return [value, name];
              }}
            />
            <Area type="monotone" dataKey="total" name="Total Customers" stroke="#EC4899" fill="#FBCFE8" strokeWidth={3} />
            <Area type="monotone" dataKey="new" name="New Customers" stroke="#4F46E5" fill="#C7D2FE" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomersChart;
