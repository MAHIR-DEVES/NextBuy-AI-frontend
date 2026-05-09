import { IAuthUser, IUser } from '@/types/auth';

export const setAuthData = (token: string, user: IAuthUser) => {
  const fullUser: IUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    status: 'ACTIVE',
    avatar: user.avatar,

    address: user.address,
    city: user.city,
    country: user.country,

    provider: user.provider,
    emailVerified: user.emailVerified,
    lastLogin: user.lastLogin,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem('accessToken', token);
  localStorage.setItem('user', JSON.stringify(fullUser));
};

export const getUser = (): IUser | null => {
  if (typeof window === 'undefined') return null;

  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};
