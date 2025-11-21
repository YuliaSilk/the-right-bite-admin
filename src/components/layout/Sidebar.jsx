import React from "react";
import {
 HomeOutlined,
 ShoppingCartOutlined,
 UserOutlined,
 TagOutlined,
 AreaChartOutlined,
 SettingOutlined,
} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

const navItems = [
 {key: "dashboard", name: "Dashboard", icon: <HomeOutlined />, path: "/admin/dashboard"},
 {key: "orders", name: "Number of Orders", icon: <ShoppingCartOutlined />, path: "/admin/orders"},
 {key: "customers", name: "Unique Customers", icon: <UserOutlined />, path: "/admin/customers"},
 {key: "sales", name: "Total Number of Sales", icon: <AreaChartOutlined />, path: "/admin/products"}, // Відповідає SalesPage
 // { key: 'settings', name: 'Settings', icon: <SettingOutlined />, path: '/admin/settings' },
];

export default function Sidebar({setCollapsed}) {
 return (
  <aside className="w-[260px]  bg-white pt-10 shadow-sm flex flex-col">
   <div className="h-16 flex items-center justify-center ">
    <h1 className="text-accent font-bold text-lg hidden">RIGHT BITE</h1>
   </div>

   <nav className="flex-1 w-[260px] px-4 space-y-2 text-main-text">
    <ul className="space-y-2 list-none flex flex-col">
     {navItems.map((item) => (
      <li key={item.key}>
       <NavLink
        to={item.path}
        className={({isActive}) =>
         `
                  w-full flex items-center space-x-3 p-3 rounded-xl transition-colors duration-150
                  ${
                   isActive
                    ? "bg-[#2c6e49] text-white shadow-md"
                    : "text-gray-600 hover:bg-[#e6f2ec] hover:text-[#2c6e49]"
                  }
                `
        }
        onClick={() => setCollapsed && setCollapsed(true)}
       >
        <span className={`text-xl ${location.pathname.includes(item.path) ? "!text-white" : "text-[#2c6e49]"}`}>
         {item.icon}
        </span>
        <span className="font-medium text-sm">{item.name}</span>
       </NavLink>
      </li>
     ))}
    </ul>
   </nav>

   <div className="text-center text-xs !text-gray-400 mt-6 pt-4 border-t border-gray-200">
    &copy; 2025 Right Bite Admin
   </div>
  </aside>
 );
}
