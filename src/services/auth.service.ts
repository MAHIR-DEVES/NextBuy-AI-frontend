export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      role: 'ADMIN' | 'CUSTOMER' | 'SELLER';
      name: string;
    };
  };
}

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Login failed');
  }

  return result;
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    role: 'ADMIN' | 'CUSTOMER' | 'SELLER';
  };
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};
