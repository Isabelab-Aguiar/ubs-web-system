import { jwtVerify } from 'jose';
import type { JwtPayload } from '@/types/auth.types';

const getSecret = () => new TextEncoder().encode(process.env.JWT_ACCESS_SECRET ?? '');

export async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function decodeAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}
