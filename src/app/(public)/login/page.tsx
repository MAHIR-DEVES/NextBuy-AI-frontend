import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
