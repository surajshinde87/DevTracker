'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineDashboard, MdOutlineMenuBook } from 'react-icons/md';
import { HiOutlineLightBulb, HiOutlineChartBar } from 'react-icons/hi';
import { PiNotebookLight } from 'react-icons/pi';

const navItems = [
  { label: 'Dashboard', icon: MdOutlineDashboard, path: '/dashboard' },
  { label: 'My Progress', icon: HiOutlineChartBar, path: '/progress' },
  { label: 'My Notes', icon: PiNotebookLight, path: '/notes' },
  { label: 'AI Mentor', icon: HiOutlineLightBulb, path: '/ai-mentor' },
  { label: 'Revision', icon: MdOutlineMenuBook, path: '/revision' },
];

export default function Sidebar({ user = { name: 'Mansi Unge', image: '' } }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const router = useRouter();

  const handleNavigation = (label: string, path: string) => {
    setActiveTab(label);
    router.push(path);
  };

  const handleLogout = () => {
    // Optionally clear auth tokens here
    router.push('/');
  };

  return (
    <aside className="h-screen fixed top-0 left-0 z-50 w-64 bg-[#f7f5fa] dark:bg-[#0c0614] text-[#6c4bc8] shadow-lg">
      {/* Brand */}
      <div className="flex items-center justify-center mt-4 px-4 py-4 font-bold text-3xl">
        DevTracker
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 mt-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;

          return (
            <div
              key={idx}
              onClick={() => handleNavigation(item.label, item.path)}
              className={`flex justify-start items-center gap-8 px-6 py-3 mx-2 rounded-lg cursor-pointer 
              ${isActive ? 'bg-[#6c4bc8] text-white font-semibold shadow-md' : 'hover:bg-[#6c4bc8]/10'}`}
            >
              <Icon size={26} />
              <span className="text-md font-semibold">{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full px-3 py-4">
        <hr className="border-gray-800 dark:border-gray-200 mb-2" />

        <button
          onClick={handleLogout}
          className="flex justify-evenly items-center gap-2 p-2 rounded-md text-gray-900 dark:text-white w-full"
        >
          <span className="text-xl font-medium">Logout</span>
          <FiLogOut size={24} />
        </button>
      </div>
    </aside>
  );
}
