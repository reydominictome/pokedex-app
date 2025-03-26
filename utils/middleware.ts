import { supabaseServer } from "@/config/supabaseConfig";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = supabaseServer(request);
    const { data: user, error } = await supabase.auth.getUser();

    // Redirect if user is not authenticated for protected routes
    if (!user && request.nextUrl.pathname.startsWith("/dex") && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Redirect authenticated users away from landing page
    if (!user && request.nextUrl.pathname === "/" && !error) {
      return NextResponse.redirect(new URL("/dex", request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({ request: { headers: request.headers } });
  }
};
