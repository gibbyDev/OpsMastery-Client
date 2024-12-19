'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="mt-56 flex flex-col items-center justify-center">
      <div className="text-white text-2xl mb-8">
        Successfully signed in!
      </div>
      <Button 
        variant="outline" 
        onClick={() => router.push('/authenticated/dashboard')}
        className="text-white hover:text-slate-900"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}