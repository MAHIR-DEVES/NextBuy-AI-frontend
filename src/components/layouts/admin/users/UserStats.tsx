'use client';

import {
  Users,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  MailCheck,
} from 'lucide-react';

interface UserStatsProps {
  total: number;
  admins: number;
  sellers: number;
  customers: number;
  active: number;
  verified: number;
}

const UserStats = ({
  total,
  admins,
  sellers,
  customers,
  active,
  verified,
}: UserStatsProps) => {
  const stats = [
    {
      label: 'Total',
      value: total,
      icon: Users,
      iconClass: 'text-gray-600 dark:text-gray-400',
    },
    {
      label: 'Customers',
      value: customers,
      icon: UserCheck,
      iconClass: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Sellers',
      value: sellers,
      icon: ShoppingBag,
      iconClass: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Admins',
      value: admins,
      icon: ShieldCheck,
      iconClass: 'text-red-600 dark:text-red-400',
    },
    {
      label: 'Active',
      value: active,
      icon: UserCheck,
      iconClass: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Verified',
      value: verified,
      icon: MailCheck,
      iconClass: 'text-blue-600 dark:text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {stats.map(stat => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>

              <Icon className={`w-4 h-4 ${stat.iconClass}`} />
            </div>

            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
