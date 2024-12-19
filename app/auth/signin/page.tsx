'use client';

import { useLoginMutation } from '@/redux/services/authApi';
import { setCredentials } from '@/redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';

export default function SignInPage() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await login(credentials).unwrap();
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response));
      dispatch(setCredentials(response));
      router.replace("/authenticated/success");
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw new Error(error.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  );
}