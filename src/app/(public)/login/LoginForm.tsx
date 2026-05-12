'use client';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  User,
  LogIn,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { loginUser } from '@/services/auth.service';
import { setAuthData } from '@/utils/auth';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await loginUser(data);
      setAuthData(res.data.accessToken, res.data.user);

      const redirect = searchParams.get('redirect');

      if (redirect) {
        router.push(redirect);
        return;
      }

      const role = res.data.user.role;
      if (role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  const loginAsAdmin = async () => {
    const data = {
      email: 'admin@gmail.com',
      password: '12345678',
    };
    setFormData(data);
    await handleLogin(data);
  };

  const loginAsCustomer = async () => {
    const data = {
      email: 'customer@gmail.com',
      password: '12345678',
    };
    setFormData(data);
    await handleLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 px-8 py-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white text-center">
                Welcome Back
              </h2>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/90 text-sm text-center">
              Sign in to your account
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Buttons */}
            <div className="space-y-3 mb-6 mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center uppercase tracking-wider">
                Quick Demo Access
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={loginAsAdmin}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-gray-950 text-white py-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] font-medium text-sm shadow-md"
                >
                  <Shield size={16} />
                  Admin Demo
                </button>

                <button
                  type="button"
                  onClick={loginAsCustomer}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] font-medium text-sm shadow-md"
                >
                  <User size={16} />
                  Customer Demo
                </button>
              </div>
            </div>
            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or login with credentials
                </span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-semibold hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          Secure login with 256-bit encryption
        </p>
      </div>
    </div>
  );
}
