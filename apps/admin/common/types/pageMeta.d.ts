// Extra route meta read by middleware/adminAuth.global.ts.
declare module '#app' {
  interface PageMeta {
    /** Page can be opened without signing in (login page). */
    isPublic?: boolean;
    /** Only the Owner role can open this page. */
    requiresOwner?: boolean;
  }
}

export {};
