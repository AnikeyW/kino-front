import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminPage = request.url.includes("admin");
  const isLoginPage = request.url.includes("login");

  const refreshToken = request.cookies.get("refreshToken")?.value as string;
  const accessToken = request.cookies.get("accessToken")?.value as string;

  if (isLoginPage) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return;
  }

  if (isAdminPage) {
    if (!refreshToken && !accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/checkauth",
      {
        headers: {
          "Content-Type": "application/json",
          accessToken,
          refreshToken,
        },
      },
    );

    const result = await response.json();

    if (result?.statusCode === 401) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/refresh",
        {
          headers: {
            "Content-Type": "application/json",
            refreshToken,
          },
        },
      );
      const result = await response.json();

      if (!result.admin) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
  return;
}

export const config = {
  matcher: ["/admin/:path*", "/login/:path*"],
};
