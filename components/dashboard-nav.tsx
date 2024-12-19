'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';
import { useSignoutMutation } from '@/redux/services/authApi';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const dispatch = useDispatch();
  const router = useRouter();
  const [signout] = useSignoutMutation();

  const handleSignOut = async () => {
    try {
      await signout().unwrap();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      // Always clean up local state regardless of API response
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      dispatch(logout());
      router.push('/');
    }
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                {item.title === 'Sign Out' ? (
                  <button
                    onClick={handleSignOut}
                    className={cn(
                      'flex w-full items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800'
                    )}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.disabled ? '/' : item.href!}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800',
                      path === item.href ? 'bg-slate-600 text-white' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                className={!isMinimized ? 'hidden' : 'inline-block'}
              >
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
