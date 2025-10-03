import React from 'react';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, TagOutlined, AreaChartOutlined, SettingOutlined } from '@ant-design/icons';

// Використовуємо шляхи, які ми визначили в App.jsx для перемикання станів
const navItems = [
  // Змінюємо path на key для внутрішнього стану
  { key: 'dashboard', name: 'Dashboard', icon: <HomeOutlined /> },
  { key: 'orders', name: 'Number of Orders', icon: <ShoppingCartOutlined /> },
  { key: 'customers', name: 'Unique Customers', icon: <UserOutlined /> },
  { key: 'sales', name: 'Total Number of Sales', icon: <AreaChartOutlined /> }, // Відповідає SalesPage
  { key: 'settings', name: 'Settings', icon: <SettingOutlined /> }, 
];

export default function Sidebar({ currentPage, onNavigate, setCollapsed }) {
  return (
   
    <aside
        className="w-64 bg-white border-r border-stroke-table shadow-sm flex flex-col"
    >
        <div className="h-16 flex items-center justify-center border-b border-stroke-table">
            <h1 className="text-accent font-bold text-lg">RIGHT BITE</h1>
        </div>
     
        {/* Навігація */}
        <nav className="flex-1 p-4 space-y-2 text-main-text">
            <ul className="space-y-2 list-none flex flex-col">
                {navItems.map((item) => {
                    const isActive = item.key === currentPage;
                    return (
                        <li key={item.key}>
                            <button
                                onClick={() => {
                                    onNavigate(item.key);
                                    if (setCollapsed) setCollapsed(true); // Закриваємо на мобільному після кліку
                                }} 
                                className={`
                                    w-full flex items-center space-x-3 p-3 rounded-xl transition-colors duration-150
                                    ${isActive 
                                        ? 'bg-[#2c6e49] !text-white !shadow-md' 
                                        : 'text-gray-600 hover:bg-[#e6f2ec] hover:text-[#2c6e49]'
                                    }
                                `}
                            >
                                {/* Перевизначаємо колір іконки та тексту для активного стану */}
                                <span className={`text-xl ${isActive ? '!text-white' : 'text-[#2c6e49]'}`}>{item.icon}</span>
                                <span className={`font-medium text-sm ${isActive ? '!text-white' : 'text-gray-600'}`}>{item.name}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
        
        {/* Футер */}
        <div className="text-center text-xs !text-gray-400 mt-6 pt-4 border-t border-gray-200">
            &copy; 2025 Right Bite Admin
        </div>
    </aside>
  );
}

