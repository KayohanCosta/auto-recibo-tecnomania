import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ensure public assets can be cached aggressively
  if (
    pathname.startsWith("/logo-") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-")
  ) {
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/(logo-|favicon|icon|apple-)",
  ],
}
