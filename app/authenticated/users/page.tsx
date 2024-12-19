'use client';

import { useGetUsersQuery } from '@/redux/services/authApi';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UsersPage() {
  const { data: users, error, isLoading } = useGetUsersQuery({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    } else {
      console.log('Current user:', user);
      if (!user.role || user.role.toLowerCase() !== 'admin') {
        router.push('/authenticated/dashboard');
      }
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Users Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <Card key={user.id} className="bg-slate-800 text-white border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-slate-400">ID: {user.id}</p>
                <p className="font-medium">Email: {user.email}</p>
                <p>Username: {user.name}</p>
                <p className="capitalize">Role: {user.role}</p>
                <p className="text-sm text-slate-400">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
