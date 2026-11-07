import type { AdminRole } from '~/common/types/adminSession';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastSignInAt: string | null;
}

export type AdminUserForm = Pick<AdminUser, 'name' | 'email' | 'role' | 'isActive'>;

export interface AdminUserApiResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  last_sign_in_at: string | null;
}

export const AdminRoleOptions: { label: string; value: AdminRole }[] = [
  { label: 'Owner (full access, manages users)', value: 'owner' },
  { label: 'Staff (content, enquiries, calendar)', value: 'staff' },
];

export const mapAdminUser = (api: AdminUserApiResponse): AdminUser => ({
  id: api.id,
  name: api.name,
  email: api.email,
  role: api.role,
  isActive: api.active,
  lastSignInAt: api.last_sign_in_at,
});

/** On create the API invites the user by email (Supabase Auth); they set their own password. */
export const toAdminUserRequest = (form: AdminUserForm) => ({
  name: form.name.trim(),
  email: form.email.trim().toLowerCase(),
  role: form.role,
  active: form.isActive,
});

export const createEmptyAdminUserForm = (): AdminUserForm => ({
  name: '',
  email: '',
  role: 'staff',
  isActive: true,
});

export const toAdminUserForm = (user: AdminUser): AdminUserForm => ({
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
});
