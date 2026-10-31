'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth-form';

export default function RegisterPage() {
  const router = useRouter();

  async function onSubmit(payload: { name?: string; email: string; password: string }) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Registration failed');
    }

    router.push('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
      <AuthForm mode="register" onSubmit={onSubmit} />
    </main>
  );
}
