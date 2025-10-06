import React, {useState, useEffect} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import {message} from 'antd';
import {  getTotalOrders, getTotalSales } from '../api/ordersAPI';

// Mock дані поки немає API для статистики
const mockData = [
  { month: "Jan", sales: 650, revenue: 520 },
  { month: "Feb", sales: 920, revenue: 800 },
  { month: "Mar", sales: 510, revenue: 380 },
  { month: "Apr", sales: 820, revenue: 620 },
  { month: "May", sales: 1200, revenue: 950 },
  { month: "Jun", sales: 580, revenue: 610 },
  { month: "Jul", sales: 830, revenue: 570 },
  { month: "Aug", sales: 350, revenue: 420 },
  { month: "Sep", sales: 850, revenue: 560 },
  { month: "Oct", sales: 780, revenue: 630 },
  { month: "Nov", sales: 560, revenue: 390 },
  { month: "Dec", sales: 680, revenue: 520 },
];

const SalesChart = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('all');
  const [dateRange] = useState('01 Oct 2025 - 31 Oct 2025');
  const [_, setRevenueValue] = useState(0);
  const [__, setSalesValue] = useState(0);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, salesRes] = await Promise.all([
          getTotalOrders(),
          getTotalSales(),
        ]);

        // 🔸 Перевіряємо, що API повертає (наприклад, число або об'єкт)
        const ordersCount = typeof ordersRes === "number" ? ordersRes : ordersRes?.count || 0;
        const totalSales = typeof salesRes === "number" ? salesRes : salesRes?.total || 0;

        setSalesValue(ordersCount);
        setRevenueValue(totalSales);
      } catch (err) {
        console.error("Error fetching sales data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {

    if (period === '30days') {
      setData(mockData.slice(-1));
    } else if (period === '7days') {
      setData(mockData.slice(-1));
    } else {
      setData(mockData);
    }
  }, [period]);

  const periodButtons = [
    {label: 'All Date', value: 'all'},
    {label: '12 Months', value: '12months'},
    {label: '30 Days', value: '30days'},
    {label: '7 Days', value: '7days'},
    {label: '24 Hour', value: '24hour'},
  ];

  const currentMonth = data[data.length - 1];
  const revenueValue = currentMonth?.revenue || 680;
  const salesValue = currentMonth?.sales || 280;

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading chart...</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Statistic</h2>
          <p className="text-sm text-gray-500">Income and Expenses</p>
        </div>
        <button className="text-accent hover:text-accent/80 font-medium flex items-center gap-2">
          More
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
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
            <div className="w-3 h-3 rounded-full bg-[#2c6e49]"></div>
            <span className="text-sm text-gray-600">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFA726]"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#666" strokeWidth="1.5" />
            <path d="M3 8h14M7 3v2M13 3v2" stroke="#666" strokeWidth="1.5" />
          </svg>
          <span className="text-sm text-gray-700">{dateRange}</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-4 right-8 bg-white p-3 rounded-lg shadow-sm border border-gray-200 z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#FFA726] "></div>
            <span className="text-xs text-gray-500">Revenue :</span>
            <span className="text-sm font-semibold text-gray-800">€{revenueValue.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2c6e49]"></div>
            <span className="text-xs text-gray-500">Sales :</span>
            <span className="text-sm font-semibold text-gray-800">€{salesValue}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}
            barGap={8}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{fill: '#666', fontSize: 12}}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{fill: '#666', fontSize: 12}}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{fill: 'rgba(0, 0, 0, 0.05)'}}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value) => [`${value}`, '']}
            />
            <Bar dataKey="sales" fill="#2c6e49" radius={[8, 8, 0, 0]} maxBarSize={40} />
            <Bar dataKey="revenue" fill="#FFA726" radius={[8, 8, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;