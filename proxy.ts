import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect report and dashboard routes
  const protectedPaths = ["/reports", "/dashboard", "/upload"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
  // return await updateSession(request);
}

export const config = {
  matcher: ["/reports/:path*", "/dashboard/:path*", "/upload", "/pricing"],
};
