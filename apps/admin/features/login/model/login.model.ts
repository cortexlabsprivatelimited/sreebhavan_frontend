import type { AdminProfile, AdminRole } from '~/common/types/adminSession';

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  profile: AdminProfile;
}

/** POST /admin/auth/login response from FastAPI (it signs in with Supabase Auth). */
export interface LoginApiResponse {
  access_token: string;
  token_type: string;
  admin: { id: string; name: string; email: string; role: AdminRole };
}

export const createEmptyLoginForm = (): LoginForm => ({ email: '', password: '' });

export const mapLoginResult = (response: LoginApiResponse): LoginResult => ({
  accessToken: response.access_token,
  profile: {
    id: response.admin.id,
    name: response.admin.name,
    email: response.admin.email,
    role: response.admin.role,
  },
});
