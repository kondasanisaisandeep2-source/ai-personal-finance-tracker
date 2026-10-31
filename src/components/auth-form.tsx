import Link from 'next/link';
import { useState } from 'react';

export function AuthForm({
  mode,
  onSubmit,
}: {
  mode: 'login' | 'register';
  onSubmit: (payload: { name?: string; email: string; password: string }) => Promise<void> | void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit({
        name: mode === 'register' ? name : undefined,
        email,
        password,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Secure Access</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none ring-0 transition focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
        <Link href={mode === 'login' ? '/register' : '/login'} className="font-semibold text-brand-600">
          {mode === 'login' ? 'Create one' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
}
