import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const sessionCookie = 'fintrack_session';

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'dev-secret-change-me-please',
);

export async function signIn(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  cookies().set(sessionCookie, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function logout() {
  cookies().set(sessionCookie, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function getSessionUserId() {
  const cookieValue = cookies().get(sessionCookie)?.value;
  if (!cookieValue) return null;

  try {
    const { payload } = await jwtVerify(cookieValue, secret);
    return typeof payload.userId === 'string' ? payload.userId : null;
  } catch {
    return null;
  }
}
