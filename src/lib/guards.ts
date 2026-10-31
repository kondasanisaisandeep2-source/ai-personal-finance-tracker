import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getSessionUserId } from '@/lib/session';

export async function requireUser() {
  const userId = await getSessionUserId();
  if (!userId) {
    redirect('/login');
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    redirect('/login');
  }

  return user;
}

export function getUserThemeCookie() {
  const cookieStore = cookies();
  return cookieStore.get('theme')?.value || 'light';
}
