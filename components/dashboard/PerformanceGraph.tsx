'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const weeklyData = [
  { label: 'Mon', accuracy: 80, speed: 60 },
  { label: 'Tue', accuracy: 90, speed: 70 },
  { label: 'Wed', accuracy: 75, speed: 65 },
  { label: 'Thu', accuracy: 85, speed: 75 },
  { label: 'Fri', accuracy: 95, speed: 80 },
  { label: 'Sat', accuracy: 70, speed: 60 },
  { label: 'Sun', accuracy: 88, speed: 78 },
];

const monthlyData = [
  { label: 'Week 1', accuracy: 78, speed: 65 },
  { label: 'Week 2', accuracy: 85, speed: 72 },
  { label: 'Week 3', accuracy: 90, speed: 75 },
  { label: 'Week 4', accuracy: 87, speed: 78 },
];

const PerformanceGraph = () => {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');
  const data = view === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="bg-white dark:bg-[#0c0614] rounded-xl p-4 shadow h-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Performance Graph ({view === 'weekly' ? 'Weekly' : 'Monthly'})
        </h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as 'weekly' | 'monthly')}
          className="bg-gray-100 dark:bg-[#1c1c24] dark:text-white text-sm px-2 py-1 rounded border dark:border-gray-600"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="label" stroke="#8884d8" />
          <YAxis domain={[50, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="#4ade80" strokeWidth={3} name="Accuracy (%)" />
          <Line type="monotone" dataKey="speed" stroke="#60a5fa" strokeWidth={3} name="Speed (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceGraph;
