"use client";

import PerformanceGraph from "@/components/dashboard/PerformanceGraph";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-64 mt-16 h-[calc(100vh-4rem)] overflow-hidden bg-gray-50 dark:bg-[#131313] text-gray-800 dark:text-white">
        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Column 1: Left Panel (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Performance Graph */}
            <PerformanceGraph/>

            {/* Progress (Pie Chart) */}
            <div className="bg-white dark:bg-[#0c0614] rounded-xl p-4 shadow flex-1 h-[250px]">
              <h2 className="text-lg font-semibold mb-2">
                User Progress (Pie Chart)
              </h2>
              <div className="h-full flex items-center justify-center text-gray-400">
                [Pie Chart Placeholder]
              </div>
            </div>
          </div>

          {/* Column 2: Middle Panel (3/12) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Calendar */}
            <div className="bg-white dark:bg-[#0c0614] rounded-xl p-4 shadow h-[250px]">
              <h2 className="text-lg font-semibold mb-2">Calendar</h2>
              <p className="text-sm text-gray-300">Calendar</p>
            </div>

            {/* Ongoing Task */}
            <div className="bg-white dark:bg-[#0c0614] rounded-xl p-4 shadow h-[180px]">
              <h2 className="text-lg font-semibold mb-2">Ongoing Task/Skill</h2>
              <p className="text-sm text-gray-300">
                Practicing React State Management
              </p>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white dark:bg-[#0c0614] rounded-xl p-4 shadow flex-1 h-[140px]">
              <h2 className="text-lg font-semibold mb-2">Upcoming Tasks</h2>
              <p className="text-sm text-gray-300">Practicing upcoming tasks</p>
            </div>
          </div>

          {/* Column 3: Right Panel (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#f7f5fa] dark:bg-[#0c0614] rounded-xl p-4 shadow h-full">
            <h2 className="text-lg font-semibold mb-2">Revision</h2>
            <div className="h-full flex items-center justify-center text-gray-400">
              Revision Notes
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
