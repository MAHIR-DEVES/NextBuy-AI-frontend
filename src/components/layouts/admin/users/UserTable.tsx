'use client';

import Image from 'next/image';
import {
  User2Icon,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Users,
  Loader2,
} from 'lucide-react';

import { IUser } from '@/types/auth';
import LoadingSpinner from '../shared/dashboard/LoadingSpinner';
import { getUserRole } from '@/utils/auth';

interface UserTableProps {
  users: IUser[];
  loading: boolean;
  updatingRole: string | null;
  onRoleChange: (userId: string, role: string) => void;
}

const UserTable = ({
  users,
  loading,
  updatingRole,
  onRoleChange,
}: UserTableProps) => {
  const role = getUserRole();
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPPER_ADMIN':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';

      case 'ADMIN':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';

      case 'SELLER':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';

      case 'CUSTOMER':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';

      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';

      case 'INACTIVE':
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';

      case 'BANNED':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';

      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin';

      case 'ADMIN':
        return 'Admin';

      case 'SELLER':
        return 'Seller';

      case 'CUSTOMER':
        return 'Customer';

      default:
        return role;
    }
  };

  if (loading) {
    return <LoadingSpinner message="users" />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800">
        <Users className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />

        <p className="text-gray-500 dark:text-gray-400">No users found</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* ================= MOBILE ================= */}
      <div className="block lg:hidden ">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-4"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <User2Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {/* Name */}
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </h3>

                {/* Email */}
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>

                {/* Role + Status */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(
                      user.role,
                    )}`}
                  >
                    {formatRole(user.role)}
                  </span>

                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>

                  {user.emailVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Role Dropdown */}
                <div className="mt-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Change Role
                  </label>

                  <select
                    value={user.role}
                    disabled={updatingRole === user.id}
                    onChange={e => onRoleChange(user.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="SELLER">Seller</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPPER_ADMIN">Super Admin</option>
                  </select>

                  {updatingRole === user.id && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Updating role...
                    </div>
                  )}
                </div>

                {/* Phone */}
                {user.phone && (
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span>{user.phone}</span>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <Calendar className="w-3 h-3" />

                  <span>
                    {new Date(user.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  User
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Contact
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Role
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Verified
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* User */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <User2Icon className="w-4 h-4 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {user.phone || '—'}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        disabled={
                          role !== 'SUPER_ADMIN' || updatingRole === user.id
                        }
                        onChange={e => onRoleChange(user.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
                      >
                        <option value="CUSTOMER">Customer</option>

                        <option value="SELLER">Seller</option>

                        <option value="ADMIN">Admin</option>

                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>

                      {updatingRole === user.id && (
                        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="px-6 py-3">
                    {user.emailVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt || '').toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
