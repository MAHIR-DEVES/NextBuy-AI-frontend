'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const res = await loginUser(formData);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={e =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full pl-10 p-3 border rounded"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={formData.password}
              onChange={e =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full pl-10 pr-10 p-3 border rounded"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white p-3 rounded disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          No account?{' '}
          <Link href="/register" className="text-orange-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
