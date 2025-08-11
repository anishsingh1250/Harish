import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow all requests in development mode - no authentication checks
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // For production, you would add proper auth checks here
  const url = request.nextUrl.clone()
  
  // Allow public routes
  if (url.pathname === '/login' || url.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // For demo purposes, allow all routes in development
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}