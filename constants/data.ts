import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/authenticated/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Tickets',
    href: '/authenticated/tickets',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Users',
    href: '/authenticated/users',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/authenticated/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Tasks',
    href: '/authenticated/tasks',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Sign Out',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
