import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getTotalOrders, getTotalSales } from "../api/ordersAPI"; 

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const [_, setRevenueValue] = useState(0);
  const [__, setSalesValue] = useState(0);
  const [dateRange, setDateRange] = useState('01 Oct 2025 - 31 Oct 2025');
  const [loading, setLoading] = useState(false);

  const fetchStats = async (startDate, endDate) => {
    setLoading(true);
    try {
      const [ordersRes, salesRes] = await Promise.all([
        getTotalOrders(startDate, endDate),
        getTotalSales(startDate, endDate),
      ]);

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

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex items-center gap-2   rounded-lg">
      <RangePicker
        format="DD MMM YYYY"
        className="!bg-white !text-green-800 !border-green-600 rounded-lg"
        onChange={(dates) => {
          if (dates) {
            const [start, end] = dates;
            const rangeText = `${dayjs(start).format("DD MMM YYYY")} - ${dayjs(end).format("DD MMM YYYY")}`;
            setDateRange(rangeText);

            fetchStats(start.toISOString(), end.toISOString());
          }
        }}
        value={[
          dayjs(dateRange.split(" - ")[0], "DD MMM YYYY"),
          dayjs(dateRange.split(" - ")[1], "DD MMM YYYY")
        ]}
        // styled={
        //     colorPrimary='#2c6e49',
        // }
      />
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default DateRangePicker;