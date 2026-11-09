# Sreebhavan Frontend (user site + admin panel)

One Nuxt 3 app for Sreebhavan Veg Hotel and Sreebhavanam Event Hall & Rooms. Talks only to the FastAPI backend,
never to Supabase. Code rules: `.claude/skills/nuxt-frontend-rules/SKILL.md`.

| Part        | Routes                                                                                                       | Code                                                            | Rendering                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------ |
| User site   | `/`, `/sreebhavan-veg-hotel/**`, `/sreebhavanam/**`, `/gallery/**`, `/about`, `/contact`, `/faq`, `/enquiry` | `features/userSite/*`, `layouts/default.vue`                    | SSR for SEO, no login, green/gold theme (`.theme-user-site`) |
| Admin panel | `/admin/**`                                                                                                  | `features/adminSite/*`, `layouts/admin.vue`, `layouts/auth.vue` | SPA (`ssr: false` route rule), login required, `noindex`     |

Shared code (API client, constants, widgets) is in `common/`. User-site-only shared widgets are in
`common/widgets/userSite/`. Brand colors for the user site are `UserSiteThemeColors` in `appColors.ts`; Tailwind turns
every hex color into a CSS variable, so shared widgets (buttons, fields, calendar) follow the theme of the layout.

## Run

```bash
cp .env.example .env        # set NUXT_PUBLIC_API_BASE_URL to the FastAPI URL (without /api/v1)
npm install
npm run dev                 # site: http://localhost:3001 · admin: http://localhost:3001/admin
npm run lint && npm run typecheck && npm run build
```

## API contract the backend must match

Paths are in `common/constants/apiConstants.ts`. Request/response shapes are the `*ApiResponse` types in each
`features/*/model/*.model.ts`. Points beyond the project plan:

| Endpoint                                                                          | Expectation                                                                                                                                             |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /admin/auth/login`                                                          | `{ email, password }` → `{ access_token, token_type, admin: { id, name, email, role } }`. FastAPI signs in with Supabase Auth. 401 on wrong password.   |
| `POST /admin/auth/logout`, `POST /admin/auth/forgot-password`                     | `{ email }` for forgot-password.                                                                                                                        |
| `POST /admin/users/{id}/reset-password`                                           | Sends a reset email (owner only).                                                                                                                       |
| `GET/DELETE /admin/rooms/{id}/images/{imageId}`, `DELETE /admin/hall/images/{id}` | Image delete endpoints.                                                                                                                                 |
| `POST /admin/uploads`                                                             | multipart `file` + `folder` (see `StorageFolders`) → `{ url, thumb_url }`. Must accept PDF for `menu/cards`.                                            |
| `GET /admin/enquiries`                                                            | Query `type, status, q, page, per_page` → `data` + `meta { current_page, per_page, total_records, total_pages }`. Export takes the same filters.        |
| `GET /admin/hall/bookings?month=YYYY-MM`                                          | Plain list. 409 when `UNIQUE(date, slot)` is violated.                                                                                                  |
| `GET /admin/dashboard/stats?month=YYYY-MM`                                        | See `DashboardStatsApiResponse`.                                                                                                                        |
| `GET /admin/gallery/images?album_id=`                                             | `POST` takes `{ album_id, images: [{ url, thumb_url, alt, caption, sort }] }` (bulk).                                                                   |
| `GET/PUT /admin/settings`                                                         | Flat object of keys, see `SiteSettingsApiResponse`.                                                                                                     |
| `GET/PUT /admin/hall`                                                             | Single hall record; 404 until it is created.                                                                                                            |
| Envelope                                                                          | Every JSON response is `{ success, status_code, message, data }`; `apiClient` returns `data`.                                                           |
| Errors                                                                            | `{ success: false, status_code, message, errors: [{ field, message }] }`. Field errors show under the matching input. 401 anywhere signs the admin out. |
| Lists                                                                             | `sort` and `active` fields; updates use `PATCH`.                                                                                                        |
