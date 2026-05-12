/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth.service';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(Math.min(strength, 4));
  };

  const getPasswordStrengthText = () => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500',
    ];
    return colors[passwordStrength];
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 2)
      newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const res = await registerUser(payload);
      toast.success('Account created successfully! Please login.', {
        duration: 3000,
        icon: <CheckCircle className="w-4 h-4" />,
      });

      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-600 dark:to-pink-600 px-8 py-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white text-center">
                Create Account
              </h2>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/90 text-sm text-center">
              Join us and start your journey
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="hello@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field with Strength Indicator */}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map(index => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            index < passwordStrength
                              ? getPasswordStrengthColor()
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Password strength:{' '}
                      <span className="font-medium">
                        {getPasswordStrengthText()}
                      </span>
                    </p>
                    {passwordStrength < 3 && formData.password.length > 0 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Tip: Use mix of letters, numbers & symbols
                      </p>
                    )}
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
