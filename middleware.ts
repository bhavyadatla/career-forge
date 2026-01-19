import { NextRequest, NextResponse } from 'next/server'

// Demo middleware - client-side auth check handles protected routes
// This middleware just passes through all requests

export async function proxy(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon-light-32x32\\.png|icon-dark-32x32\\.png|icon\\.svg|apple-icon\\.png).*)',
  ],
}
