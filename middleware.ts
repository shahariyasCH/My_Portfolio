import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-key";

  // 1. Protect all /api/admin/* API endpoints (return 401 JSON if unauthorized)
  if (pathname.startsWith("/api/admin")) {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Administrator authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 2. Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = await getToken({ req, secret });

    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. If already logged in and visiting /admin/login, redirect to /admin dashboard
  if (pathname === "/admin/login") {
    const token = await getToken({ req, secret });

    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
