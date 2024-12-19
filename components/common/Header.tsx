'use client';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';
import type { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <header className="bg-slate-950">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-white">
              {user?.email}
            </div>
          </div>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
} 