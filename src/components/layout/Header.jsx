// src/components/layout/Header.jsx
import React from 'react';
import { SearchOutlined, BellOutlined } from '@ant-design/icons';

export default function Header() {
  return (
    <header className="bg-[#234d2e] w-full h-[68px] p-4 shadow-md  fixed top-0 left-0 z-[10]">
        <div className='w-[1320px] p-[16px] flex justify-between items-center '>
      <div className="relative w-1/3">
        <input 
          type="text" 
          placeholder="Search data, users, or reports" 
          className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white rounded-xl focus:ring-accent focus:border-accent"
        />
        <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div>
<img src="/src/assets/logo_right _bite.png" alt="logo" className="w-auto h-[28px]" />
</div>
      {/* Права частина: Профіль та повідомлення */}
      <div className="flex items-center space-x-4">
        <BellOutlined className="text-xl text-icon cursor-pointer hover:text-accent" />
        
        {/* Блок профілю, як на макеті */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="text-right">
            <div className="font-semibold text-main-text">Matt Hoffman</div>
            <div className="text-xs text-addition-text">Manager</div>
          </div>
          {/* Тут має бути аватар - можна використати заглушку */}
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
            MH
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}