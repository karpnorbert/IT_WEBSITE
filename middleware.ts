import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // In a real application, you would verify the JWT token here
  // For this demo, we'll just check if the user object exists in localStorage

  // This is a simplified example - in a real app, you would use
  // proper JWT verification on the server side

  // For demo purposes, we'll just redirect unauthenticated users
  // from admin routes to the login page

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // In a real app, this would verify the token from cookies or headers
    // Since we can't access localStorage in middleware, this is just a placeholder
    // You would implement proper JWT verification here

    // For demo purposes, we'll allow access and handle auth in the client components
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

