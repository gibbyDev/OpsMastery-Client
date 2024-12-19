'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('reset_token');

  useEffect(() => {
    console.log('URL Search Params:', Object.fromEntries(searchParams.entries()));
    console.log('Reset Token:', resetToken);
  }, [searchParams, resetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with token:', resetToken);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to reset password with token:', resetToken);
      
      const response = await fetch('http://127.0.0.1:8080/api/v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reset_token: resetToken,
          new_password: password 
        }),
      });

      const data = await response.json();
      console.log('Reset password response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      router.push('/auth/signin?reset=success');
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-background">
        <Card className="w-full max-w-md p-6">
          <CardContent className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Invalid Reset Link</h2>
            <p className="text-muted-foreground">
              This password reset link is invalid or has expired.
            </p>
            <Button onClick={() => router.push('/auth/signin')} className="w-full">
              Return to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen gradient-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter your new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Confirm your new password"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <CardFooter className="flex flex-col space-y-4 px-0 pt-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/auth/signin')}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 