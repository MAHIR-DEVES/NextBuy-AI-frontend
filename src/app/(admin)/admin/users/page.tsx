/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  User2Icon,
  Search,
  Filter,
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserCheck,
  UserX,
} from 'lucide-react';

import { getAllUsers } from '@/services/auth.service';
import { IUser } from '@/types/auth';

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        setUsers(res?.data || []);
        setFilteredUsers(res?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(
        user =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.includes(searchTerm),
      );
    }

    if (roleFilter !== 'ALL') {
      result = result.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
  };

  const hasActiveFilters =
    searchTerm || roleFilter !== 'ALL' || statusFilter !== 'ALL';

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'SELLER':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
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

  const stats = {
    total: filteredUsers.length,
    admins: filteredUsers.filter(u => u.role === 'ADMIN').length,
    sellers: filteredUsers.filter(u => u.role === 'SELLER').length,
    customers: filteredUsers.filter(u => u.role === 'CUSTOMER').length,
    active: filteredUsers.filter(u => u.status === 'ACTIVE').length,
    verified: filteredUsers.filter(u => u.emailVerified).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="px-4 py-6 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all registered users
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {stats.total}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              {stats.customers}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Sellers</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              {stats.sellers}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              {stats.active}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              {stats.active}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Verified</p>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {stats.verified}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="p-4">
            {/* Search Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filters
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Row */}
            {showFilters && (
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="ALL">All</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SELLER">Seller</option>
                    <option value="CUSTOMER">Customer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="ALL">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BANNED">Banned</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-2">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800">
              <Users className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No users found</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-3">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-4"
                  >
                    <div className="flex items-start gap-3">
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
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}
                          >
                            {user.role}
                          </span>
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}
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
                        {user.phone && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(
                              user.createdAt || '',
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
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
                    {filteredUsers.map(user => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
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
                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {user.phone || '—'}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          {user.emailVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.createdAt || '').toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
