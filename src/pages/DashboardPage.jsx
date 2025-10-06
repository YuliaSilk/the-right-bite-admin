// src/pages/DashboardPage.jsx
import React, {useState, useEffect} from 'react';
import DashboardCard from '../components/DashboardCard';
import { AreaChartOutlined, DollarCircleOutlined, UsergroupAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { getTotalCustomers, getTotalOrders, getTotalSales, getAllOrders } from "../api/ordersAPI";
import { message, Row, Col } from 'antd';

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


const dashboardButtons = [
    { id: 1, title: "Sales" },
    { id: 2, title: "Orders" },
    { id: 3, title: "Customers" },
    { id: 4, title: "Revenue" },
  ];

function DashboardPage() {
    const [metrics, setMetrics] = useState({
        totalCustomers: 0,
        totalOrders: 0,
        totalSales: 0,
      });
    const [activeButton, setActiveButton] = useState("Sales"); 
    const [orders, setOrders] = useState([]);
    const [_, setLoading] = useState(true);

    // useEffect(() => {
    //     if (activeButton === "Orders") {
    //       getAllOrders().then((data) => {
    //         setOrders(data);
    //       });
    //     }
    //     const fetchMetrics = async () => {
    //         try {
    //           const [customers, orders, sales] = await Promise.all([
    //             getTotalCustomers(),
    //             getTotalOrders(),
    //             getTotalSales(),
    //           ]);
      
    //           setMetrics({
    //             totalCustomers: customers.total, // структура залежить від API
    //             totalOrders: orders.total,
    //             totalSales: sales.total,
    //           });
    //         } catch (err) {
    //           console.error(err);
    //           message.error('Failed to load dashboard metrics');
    //         } finally {
    //           setLoading(false);
    //         }
    //       };
      
    //       fetchMetrics();
    //   }, [activeButton]);
    useEffect(() => {
        // Завантажуємо метрики
        const fetchMetrics = async () => {
          try {
            setLoading(true);
            const [customers, ordersCount, sales] = await Promise.all([
              getTotalCustomers(),
              getTotalOrders(),
              getTotalSales(),
            ]);
    
            setMetrics({
              totalCustomers: customers || 0,
              totalOrders: ordersCount || 0,
              totalSales: sales || 0,
            });
          } catch (err) {
            console.error(err);
            message.error('Failed to load dashboard metrics');
          } finally {
            setLoading(false);
          }
        };
    
        fetchMetrics();
      }, []);
    
      useEffect(() => {
        // Завантажуємо замовлення, якщо активна кнопка "Orders"
        if (activeButton === "Orders") {
          const fetchOrders = async () => {
            try {
              const data = await getAllOrders();
              setOrders(data || []);
            } catch (err) {
              console.error(err);
              message.error('Failed to load orders');
            }
          };
          fetchOrders();
        }
      }, [activeButton]);

      const cardsData = [
        {
          title: 'Total Customers',
          value: metrics.totalCustomers,
          change: '+5%',
          changeValue: '1,024',
          icon: <UsergroupAddOutlined className="text-xl text-primary" />,
          bgColor: 'bg-primary/10',
        },
        {
          title: 'Total Orders',
          value: metrics.totalOrders,
          change: '+10%',
          changeValue: '500',
          icon: <ShoppingCartOutlined className="text-xl text-warning" />,
          bgColor: 'bg-yellow-100',
        },
        {
          title: 'Total Sales',
          value: `€${metrics.totalSales}`,
          change: '+15%',
          changeValue: '€12,340',
          icon: <DollarCircleOutlined className="text-xl text-success" />,
          bgColor: 'bg-green-100',
        },
      ];
    
      const dashboardContent = () => {
        switch (activeButton) {
          case "Sales":
            return <div>Sales Content</div>;
          case "Orders":
            return (
              <div>
                {orders.length === 0 ? (
                  <p>No orders yet</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-2 border-b">
                      Order #{order.id} — {order.orderStatus}
                    </div>
                  ))
                )}
              </div>
            );
          case "Customers":
            return <div>Customers Content</div>;
          case "Revenue":
            return <div>Revenue Content</div>;
          default:
            return null;
        }
      };
    //   const dashboardButtons = () => {
    //     switch (activeButton) {
    //       case "Sales":
    //         return <DashboardSales />;
    //       case "Orders":
    //         return <DashboardOrders />;
    //       case "Customers":
    //         return <DashboardCustomers />;
    //       case "Revenue":
    //         return <DashboardRevenue />;
    //       default:
    //         return null;
    //     }
    //   };

  return (
    <div className="space-y-8  ">
      {/* Привітання */}
      <div className='flex justify-between items-center'>
      <div className="mb-6">
        <h1 className=" font-primary font-[600] text-[32px] text-main-text">Welcome Back, Matt</h1>
        <p className="text-addition-text mt-1">
          Access your latest business metrics, manage customer orders, and keep your store running smoothly.
        </p>
      </div>
      <div className='flex justify-between items-center'>
        
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="text-right">
            <div className="font-semibold text-accent">Matt Hoffman</div>
            <div className="text-xs text-amber-accent">Manager</div>
          </div>
            <div className="w-10 h-10 bg-accent rounded-full border-[1px] flex items-center justify-center text-accent font-bold ">
           <span>MH</span> 
          </div>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M4.81234 6.75H13.1913C13.3397 6.75003 13.4846 6.79404 13.6079 6.87645C13.7312 6.95886 13.8273 7.07598 13.8841 7.21301C13.9409 7.35003 13.9557 7.50081 13.9268 7.64627C13.8979 7.79174 13.8264 7.92536 13.7216 8.03025L9.53209 12.2197C9.39144 12.3603 9.20071 12.4393 9.00184 12.4393C8.80297 12.4393 8.61224 12.3603 8.47159 12.2197L4.28209 8.03025C4.17723 7.92536 4.10583 7.79174 4.0769 7.64627C4.04798 7.50081 4.06283 7.35003 4.11958 7.21301C4.17633 7.07598 4.27244 6.95886 4.39575 6.87645C4.51905 6.79404 4.66403 6.75003 4.81234 6.75Z" fill="#2D6B41"/>
</svg>
          </div>
        </div> 
        </div>
        </div>
      {/* 1. Секція Карток Метрик */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {dashboardMetrics.map((metric) => (
          <DashboardCard key={metric.title} {...metric} />
        ))}
         
    {cardsData.map((card, idx) => (
     
        <DashboardCard key={idx}{...card} />
     
    ))}
  
      </div>
      <div className="flex justify-between">
        {dashboardButtons.map((button) => {
          const isActive = activeButton === button.title;

          return (
            <button
              key={button.id}
              onClick={() => setActiveButton(button.title)}
              className={`w-[260px] h-[83px] rounded-xl font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-[#2c6e49] text-white shadow-md"
                    : "bg-[#D2E7D3] text-gray-700 hover:bg-[#e6f2ec] hover:text-[#2c6e49]"
                }`}
            >
              {button.title}
            </button>
          );
        })}
      </div>

      <div className="bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-xl font-secondary font-semibold text-main-text mb-4">
          Statistic — <span className="text-[#2c6e49]">{activeButton}</span>
        </h2>   
        <div className="bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold text-main-text mb-4">
          Statistic — <span className="text-[#2c6e49]">{activeButton}</span>
        </h2>
        {dashboardContent()}
      </div>
        {/* <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-addition-text">
            Showing {activeButton} data...
          </p>
        </div> */}
      </div>
      
    </div>
  );
}

export default DashboardPage;