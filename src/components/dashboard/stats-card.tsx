import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  Icon: LucideIcon;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon }) => (
  <div className="px-6 py-6 bg-gray-800 rounded-lg border border-gray-700">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <Icon className="w-5 h-5 text-gray-500" />
    </div>
    <div className="mt-2">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  </div>
);