import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';

export async function getCurrentUser() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  return db.user.findUnique({ where: { id: userId } });
}

export async function ensureAuthenticated() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export function setThemePreference(theme: 'light' | 'dark') {
  cookies().set('theme', theme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
