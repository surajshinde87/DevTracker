'use client';

import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiSettings, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-64 right-0 z-40 bg-[#f7f5fa] dark:bg-[#0c0614] h-16 px-10 flex items-center justify-between shadow-sm"
    >
      {/* Title */}
      <div className="text-2xl font-bold text-[#6c4bc8]">
        Welcome Back, Mansi!
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 relative">

        {/* Notifications */}
        <div className="relative">
          <button
            title="Notifications"
            className="text-gray-600 dark:text-gray-300 hover:text-[#6c4bc8] transition-all duration-200 transform hover:scale-110"
          >
            <FiBell size={22} />
          </button>
          {/* Red Dot */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </div>

        {/* Settings */}
        <button
          title="Settings"
          className="text-gray-600 dark:text-gray-300 hover:text-[#6c4bc8] transition-all duration-200 transform hover:scale-110"
        >
          <FiSettings size={22} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer relative select-none">
          <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3">
            <FaUserCircle size={28} className="text-gray-700 dark:text-white" />
            <span className="text-md font-medium text-gray-800 dark:text-white hidden md:inline">Mansi</span>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute top-12 -right-6 bg-white dark:bg-gray-800 shadow-xl rounded-md w-44 py-2 z-50">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                <FiUser size={16} /> Profile
              </button>
              <hr className='m-2' />
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
