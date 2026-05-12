'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMe } from '@/services/user.service';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  User,
  Pencil,
  Save,
  X,
  Calendar,
} from 'lucide-react';
import { IUser } from '@/types/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    getMe().then(res => {
      const data = res?.data;
      setUser(data);
      setForm({
        name: data?.name || '',
        phone: data?.phone || '',
        address: data?.address || '',
        currentPassword: '',
        newPassword: '',
      });
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    // Add your save logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setEditMode(false);
  };

  const getRoleBadgeClass = () => {
    return user?.role === 'ADMIN'
      ? 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
      : 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Update your profile details
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Role Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeClass()}`}
                >
                  {user?.role}
                </span>

                {/* Edit/Cancel Button */}
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    {preview || user?.avatar ? (
                      <Image
                        src={preview || user?.avatar || '/avatar.png'}
                        alt="avatar"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                    )}
                  </div>

                  {editMode && (
                    <label className="absolute bottom-1 right-1 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
                  Profile Picture
                </p>
              </div>

              {/* Form Section */}
              <div className="flex-1 space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="name"
                      value={form.name}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 transition-colors ${
                        !editMode
                          ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      value={user?.email || ''}
                      disabled
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="phone"
                      value={form.phone}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 transition-colors ${
                        !editMode
                          ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="address"
                      value={form.address}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 transition-colors ${
                        !editMode
                          ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                      }`}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* Password Change Section */}
                {editMode && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Change Password
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        placeholder="Current password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                      <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="New password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                )}

                {/* Save Button */}
                {editMode && (
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Information
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Member since {new Date().getFullYear()} • Last login today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
