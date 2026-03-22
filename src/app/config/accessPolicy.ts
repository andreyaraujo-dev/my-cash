export const ROUTES_ALLOWED_WHEN_RESTRICTED = [
  '/home',
  '/profile',
  '/profile/subscription',
] as const;

export const PREMIUM_ROUTES = [
  '/transactions',
  '/accounts',
  '/categories',
  '/reports',
  '/goals',
  '/simulations',
] as const;

export function isRouteMatch(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isPremiumRoute(pathname: string) {
  return PREMIUM_ROUTES.some((route) => isRouteMatch(pathname, route));
}

export function isAllowedWhenRestricted(pathname: string) {
  return ROUTES_ALLOWED_WHEN_RESTRICTED.some((route) => isRouteMatch(pathname, route));
}
