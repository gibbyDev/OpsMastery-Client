import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setCredentials } from '@/redux/features/authSlice';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        router.push('/auth/signin');
      } else if (!user && storedUser) {
        dispatch(setCredentials(JSON.parse(storedUser)));
      }
    }
  }, [isAuthenticated, user, router, dispatch]);

  return { 
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false, 
    user 
  };
} 