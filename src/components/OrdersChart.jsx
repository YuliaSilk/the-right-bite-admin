import React, {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import {Typography} from "antd";
import {getTotalOrders, getTotalSales} from "../api/ordersAPI";
import DateRangePicker from "./DatePicker";

const {Title} = Typography;

const mockData = [
 {month: "Jan", count: 120, avgCheck: 32},
 {month: "Feb", count: 150, avgCheck: 35},
 {month: "Mar", count: 100, avgCheck: 28},
 {month: "Apr", count: 180, avgCheck: 40},
 {month: "May", count: 220, avgCheck: 45},
 {month: "Jun", count: 160, avgCheck: 38},
 {month: "Jul", count: 190, avgCheck: 42},
 {month: "Aug", count: 200, avgCheck: 44},
 {month: "Sep", count: 210, avgCheck: 41},
 {month: "Oct", count: 230, avgCheck: 46},
 {month: "Nov", count: 250, avgCheck: 50},
 {month: "Dec", count: 270, avgCheck: 52},
];

const OrdersChart = () => {
 const [data, _] = useState(mockData);
 const [loading, setLoading] = useState(true);
 const [period, setPeriod] = useState("all");
 // const [dateRange] = useState('01 Jan - 31 Dec 2025');
 const [orderCount, setOrderCount] = useState(0);
 const [avgCheck, setAvgCheck] = useState(0);

 useEffect(() => {
  const fetchStats = async () => {
   setLoading(true);
   try {
    const [totalOrders, totalSales] = await Promise.all([getTotalOrders(), getTotalSales()]);

    const averageCheck = totalOrders ? totalSales / totalOrders : 0;

    setOrderCount(totalOrders);
    setAvgCheck(averageCheck);
   } catch (err) {
    console.error("Error fetching stats:", err);
   } finally {
    setLoading(false);
   }
  };

  fetchStats();
 }, []);

 if (loading) {
  return <div className="flex justify-center items-center h-96">Loading chart...</div>;
 }

 const periodButtons = [
  {label: "All Date", value: "all"},
  {label: "12 Months", value: "12months"},
  {label: "30 Days", value: "30days"},
  {label: "7 Days", value: "7days"},
  {label: "24 Hour", value: "24hour"},
 ];

 return (
  <div className="bg-white p-6 rounded-xl shadow-md">
   <div className="flex justify-between items-center mb-6">
    <div>
     <h2 className="text-xl font-semibold text-gray-800">Order Dynamics</h2>
     <p className="text-sm text-gray-500">Number of Orders and Average Check</p>
    </div>
    <button className="text-[#2c6e49] hover:text-[#2c6e49]/80 font-medium flex items-center gap-2">
     More
     <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
     >
      <path
       d="M7.5 15L12.5 10L7.5 5"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
      />
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
        period === btn.value ? "bg-[#D2E7D3] text-[#2c6e49]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
       }`}
      >
       {btn.label}
      </button>
     ))}
    </div>

    <div className="flex items-center gap-6">
     <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-[#2c6e49]" />
      <span className="text-sm text-gray-600">Orders: {orderCount}</span>
     </div>
     <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-[#FFA726]" />
      <span className="text-sm text-gray-600">Avg Check: €{avgCheck.toFixed(2)}</span>
     </div>
    </div>
    <DateRangePicker
     setPeriod={setPeriod}
     // fetchChartData={fetchStats}
    />
   </div>

   <ResponsiveContainer
    width="100%"
    height={350}
   >
    <BarChart
     data={data}
     margin={{top: 20, right: 30, left: 20, bottom: 5}}
     barGap={8}
     barCategoryGap="20%"
    >
     <CartesianGrid
      strokeDasharray="3 3"
      stroke="#f0f0f0"
      vertical={false}
     />
     <XAxis
      dataKey="month"
      axisLine={false}
      tickLine={false}
      tick={{fill: "#666", fontSize: 12}}
     />
     <YAxis
      yAxisId="left"
      dataKey="count"
      axisLine={false}
      tickLine={false}
      tick={{fill: "#666", fontSize: 12}}
     />
     <YAxis
      yAxisId="right"
      orientation="right"
      dataKey="avgCheck"
      axisLine={false}
      tickLine={false}
      tick={{fill: "#666", fontSize: 12}}
      tickFormatter={(value) => `€${value}`}
     />
     <Tooltip
      cursor={{fill: "rgba(0, 0, 0, 0.05)"}}
      contentStyle={{
       backgroundColor: "white",
       border: "1px solid #e5e5e5",
       borderRadius: "8px",
       padding: "8px 12px",
      }}
      formatter={(value, name) => {
       if (name === "count") return [value, "Orders Count"];
       if (name === "avgCheck") return [`€${value.toFixed(2)}`, "Average Check"];
       return [value, name];
      }}
     />
     <Bar
      yAxisId="left"
      dataKey="count"
      name="Orders Count"
      fill="#2c6e49"
      radius={[8, 8, 0, 0]}
      maxBarSize={40}
     />
     <Bar
      yAxisId="right"
      dataKey="avgCheck"
      name="Average Check"
      fill="#FFA726"
      radius={[8, 8, 0, 0]}
      maxBarSize={40}
     />
    </BarChart>
   </ResponsiveContainer>
  </div>
 );
};

export default OrdersChart;
