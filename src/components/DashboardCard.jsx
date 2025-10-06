// src/components/dashboard/DashboardCard.jsx
import React from 'react';
import { Card, Button, Dropdown } from 'antd'; 
import { EllipsisOutlined } from '@ant-design/icons';

export default function DashboardCard({ title, value, change, changeValue, icon, bgColor }) {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-success' : 'text-red';

  return (
    // Використовуємо компонент Card від AntD для гарного вигляду
    <Card className="rounded-xl shadow-lg border-none p-6" >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          {/* Іконка */}
          <div className={`p-3 rounded-full ${bgColor}`}>
            {icon}
          </div>
          <div>
            <p className="text-addition-text text-sm">{title}</p>
            <h2 className="text-3xl font-bold text-main-text mt-1">{value}</h2>
          </div>
        </div>
        
        {/* Кнопка з трьома крапками */}
        <Dropdown 
          menu={{ items: [{ key: '1', label: 'View Details' }] }} 
          placement="bottomRight"
        >
          <Button type="text" icon={<EllipsisOutlined className="text-xl" />} />
        </Dropdown>
      </div>
      
      {/* Зміни за 7 днів */}
      <div className="mt-4 flex items-center space-x-4 text-sm">
        <span className={`${changeColor} font-semibold`}>{change}</span>
        <span className="text-addition-text">
          <span className="font-semibold text-main-text">Previous 7days</span> ({changeValue})
        </span>
      </div>
      
      {/* Кнопка Details */}
      <div className="mt-4">
        <Button className="border-accent text-accent hover:text-accent-hover hover:border-accent-hover rounded-lg">
          Details
        </Button>
      </div>
    </Card>
  );
}