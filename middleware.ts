import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // what routes is it going
  const isGoingDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isGoingToLogin = req.nextUrl.pathname.startsWith("/signin");

  // if it tries to access dashboard without token, redirect to login
  if (isGoingDashboard && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // if it tries to access login with token, redirect to dashboard
  if (isGoingToLogin && token) {
    return NextResponse.redirect(
      new URL("/dashboard/medication_schedule", req.url),
    );
  }

  // otherwise, let it pass
  return NextResponse.next();
}

// This middleware will run on every request to the application. It checks if the user has an "access_token" cookie and redirects them accordingly based on the route they are trying to access.
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de la aplicación excepto:
     * - api (rutas de API internas de Next.js)
     * - _next/static (archivos estáticos como el CSS de Tailwind)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (icono de la pestaña del navegador)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};