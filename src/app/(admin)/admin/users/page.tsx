'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { User2Icon } from 'lucide-react';

import { getAllUsers } from '@/services/auth.service';
import { IUser } from '@/types/auth';
import { getToken } from '@/utils/auth';

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllUsers();

        setUsers(res?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-sm text-gray-500">Manage all registered users</p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px]">
            {/* TABLE HEAD */}
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Verified</th>
                <th className="px-6 py-4 font-semibold">Created</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition"
                >
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover ring-2 ring-orange-100"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <User2Icon className="h-6 w-6 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.phone || 'N/A'}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === 'ADMIN'
                          ? 'bg-red-100 text-red-600'
                          : user.role === 'SELLER'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* VERIFIED */}
                  <td className="px-6 py-4">
                    {user.emailVerified ? (
                      <span className="text-green-600 text-sm font-medium">
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-600 text-sm font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* CREATED */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt || '').toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}
          {!loading && users.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
