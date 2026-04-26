import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/session';

const PROTECTED_PREFIXES = ['/dashboard'];
const PUBLIC_ONLY = ['/login'];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isPublicOnly = PUBLIC_ONLY.some((p) => pathname.startsWith(p));

  const token = request.cookies.get('accessToken')?.value;
  const isAuthenticated = token ? await verifyAccessToken(token) : false;

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicOnly && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
