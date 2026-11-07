export type AdminRole = 'owner' | 'staff';

/** Signed-in admin, kept in a cookie for the session. */
export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}
