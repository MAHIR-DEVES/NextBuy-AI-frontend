'use client';

import { useEffect, useState } from 'react';

import { getAllUsers } from '@/services/auth.service';

import { IUser } from '@/types/auth';

import { toast } from 'sonner';
import { updateUserRole } from '@/services/user.service';
import UserStats from '@/components/layouts/admin/users/UserStats';
import UserFilters from '@/components/layouts/admin/users/UserFilters';
import UserTable from '@/components/layouts/admin/users/UserTable';

const UserPage = () => {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [showFilters, setShowFilters] = useState(false);

  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  // ==========================================
  // Fetch Users
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllUsers();

        const userData = res?.data || [];

        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error(error);

        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================================
  // Search + Filter
  // ==========================================

  useEffect(() => {
    let result = [...users];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter(user => {
        return (
          user.name?.toLowerCase().includes(search) ||
          user.email?.toLowerCase().includes(search) ||
          user.phone?.includes(search)
        );
      });
    }

    // Role
    if (roleFilter !== 'ALL') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Status
    if (statusFilter !== 'ALL') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, users]);

  // ==========================================
  // Update Role
  // ==========================================

  const handleRoleChange = async (userId: string, newRole: IUser['role']) => {
    const currentUser = users.find(user => user.id === userId);

    if (!currentUser) {
      return;
    }

    // No change
    if (currentUser.role === newRole) {
      return;
    }

    try {
      setUpdatingRole(userId);

      await updateUserRole(userId, newRole);

      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                role: newRole,
              }
            : user,
        ),
      );

      toast.success('User role updated successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to update user role');
    } finally {
      setUpdatingRole(null);
    }
  };

  // ==========================================
  // Clear Filters
  // ==========================================

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' || roleFilter !== 'ALL' || statusFilter !== 'ALL';

  // ==========================================
  // Stats
  // ==========================================

  const stats = {
    total: filteredUsers.length,

    admins: filteredUsers.filter(
      user => user.role === 'ADMIN' || user.role === 'SUPER_ADMIN',
    ).length,

    sellers: filteredUsers.filter(user => user.role === 'SELLER').length,

    customers: filteredUsers.filter(user => user.role === 'CUSTOMER').length,

    active: filteredUsers.filter(user => user.status === 'ACTIVE').length,

    verified: filteredUsers.filter(user => user.emailVerified).length,
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen ">
      <div className=" ">
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
        <UserStats
          total={stats.total}
          admins={stats.admins}
          sellers={stats.sellers}
          customers={stats.customers}
          active={stats.active}
          verified={stats.verified}
        />

        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {/* Users */}
        <UserTable
          users={filteredUsers}
          loading={loading}
          updatingRole={updatingRole}
          onRoleChange={handleRoleChange}
        />
      </div>
    </div>
  );
};

export default UserPage;
