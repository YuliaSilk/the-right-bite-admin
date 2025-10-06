// src/components/layout/Header.jsx
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

export default function Header() {
  return (
    <header className="bg-[#234d2e] w-full h-[68px] py-2.5 px-[60px] shadow-md flex items-center fixed top-0 left-0 z-[10] mb-10">
        <div className='w-[1320px] mx-auto py-4 flex justify-between self-center  '>
        <div>
<img src="/src/assets/logo_right _bite.png" alt="logo" className="w-auto h-[52px] ml-18" />
</div>
      <div className="relative w-1/3 h-[32px] items-center self-center">
        <input 
          type="text" 
          placeholder="Search data, users, or reports" 
          className="w-full h-[32px] pl-[20px] pr-[12px] py-[4px] border border-gray-300  text-[16px] text-[#525252] bg-[#F5F5F5] rounded-[12px] focus:ring-accent focus:border-accent-light"
        />
        <SearchOutlined className="absolute  right-[4px] top-1/2 h-[24px] transform -translate-y-1/2 text-black hover:text-gray-400" />
      </div>
  
      <div className="flex items-center space-x-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
<path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.26953 18.346C4.26953 18.346 6.49853 15.5 11.9985 15.5C17.4985 15.5 19.7285 18.346 19.7285 18.346M11.9985 12C12.7942 12 13.5572 11.6839 14.1199 11.1213C14.6825 10.5587 14.9985 9.79565 14.9985 9C14.9985 8.20435 14.6825 7.44129 14.1199 6.87868C13.5572 6.31607 12.7942 6 11.9985 6C11.2029 6 10.4398 6.31607 9.87721 6.87868C9.3146 7.44129 8.99853 8.20435 8.99853 9C8.99853 9.79565 9.3146 10.5587 9.87721 11.1213C10.4398 11.6839 11.2029 12 11.9985 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      
      </div>
      </div>
    </header>
  );
}