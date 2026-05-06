export interface IAuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER' | 'SELLER';
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;

  role: 'ADMIN' | 'CUSTOMER' | 'SELLER';
  status: 'ACTIVE' | 'INACTIVE';

  avatar: string;

  address: string | null;
  city: string | null;
  country: string | null;

  provider: string | null;

  emailVerified: boolean;
  lastLogin: string | null;

  createdAt: string;
  updatedAt: string;
}
