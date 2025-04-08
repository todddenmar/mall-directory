import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher(["/register(.*)", "/profile(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isReceptionistRoute = createRouteMatcher(["/receptionist(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ permission: "org:admin:access" });
    });
  }

  if (isReceptionistRoute(req)) {
    await auth.protect((has) => {
      return (
        has({ permission: "org:admin:access" }) ||
        has({ permission: "org:receptionist:access" })
      );
    });
  }
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
