# Sreebhavan Admin

Admin panel for Sreebhavan Veg Hotel and Sreebhavanam Event Hall & Rooms. Nuxt 3 SPA (`ssr: false`, `noindex`).
Talks only to the FastAPI backend, never to Supabase. Code rules: `.claude/skills/nuxt-frontend-rules/SKILL.md`.

## Run

```bash
cp .env.example .env        # set NUXT_PUBLIC_API_BASE_URL to the FastAPI URL (without /api/v1)
npm install
npm run dev                 # http://localhost:3001
npm run dev:mock            # same, with a fake API (mock-api/) and sample data: no backend needed
npm run lint && npm run typecheck && npm run build
```

## Mock API (no backend)

`npm run dev:mock` serves a fake FastAPI at `/api/v1` inside the dev server. Any email and password sign in as an
Owner. Changes are kept in memory until the server restarts. It is only switched on by `MOCK_API=true`, so normal
`dev` and `build` never include it. Delete `mock-api/` once the real API is ready.

## API contract the backend must match

Paths are in `common/constants/apiConstants.ts`. Request/response shapes are the `*ApiResponse` types in each
`features/*/model/*.model.ts`. Points beyond the project plan:

| Endpoint                                                                          | Expectation                                                                                                                                           |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /admin/auth/login`                                                          | `{ email, password }` → `{ access_token, token_type, admin: { id, name, email, role } }`. FastAPI signs in with Supabase Auth. 401 on wrong password. |
| `POST /admin/auth/logout`, `POST /admin/auth/forgot-password`                     | `{ email }` for forgot-password.                                                                                                                      |
| `POST /admin/users/{id}/reset-password`                                           | Sends a reset email (owner only).                                                                                                                     |
| `GET/DELETE /admin/rooms/{id}/images/{imageId}`, `DELETE /admin/hall/images/{id}` | Image delete endpoints.                                                                                                                               |
| `POST /admin/uploads`                                                             | multipart `file` + `folder` (see `StorageFolders`) → `{ url, thumb_url }`. Must accept PDF for `menu/cards`.                                          |
| `GET /admin/enquiries`                                                            | Query `type, status, q, page, page_size` → `{ items, total, page, page_size }`. Export takes the same filters.                                        |
| `GET /admin/hall/bookings?month=YYYY-MM`                                          | Plain list. 409 when `UNIQUE(date, slot)` is violated.                                                                                                |
| `GET /admin/dashboard/stats?month=YYYY-MM`                                        | See `DashboardStatsApiResponse`.                                                                                                                      |
| `GET /admin/gallery/images?album_id=`                                             | `POST` takes `{ album_id, images: [{ url, thumb_url, alt, caption, sort }] }` (bulk).                                                                 |
| `GET/PUT /admin/settings`                                                         | Flat object of keys, see `SiteSettingsApiResponse`.                                                                                                   |
| `GET/PUT /admin/hall`                                                             | Single hall record; 404 until it is created.                                                                                                          |
| Errors                                                                            | `{ error: { code, message } }` (FastAPI `detail` also handled). 401 anywhere signs the admin out.                                                     |
| Lists                                                                             | `sort` and `active` fields; updates use `PATCH`.                                                                                                      |
