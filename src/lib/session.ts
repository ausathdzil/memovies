import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.SECRET);

export type Payload = {
  userId: number;
  expiresAt: Date;
};

export async function encryppt(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encryppt({ userId, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax' as 'lax',
    path: '/',
  });

  redirect('/dashboard');
}

export async function verifySession() {
  const sessionCookie = cookies().get('session')?.value;
  const session = await decrypt(sessionCookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete('session');
  redirect('/login');
}
