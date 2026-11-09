# Sreebhavan API Specification (FastAPI backend)

**Version:** v1 · **Updated:** 9 Nov 2026 · **Status:** Admin endpoints are built (`sreebhavan_backend`) and connected to the admin panel. Public endpoints: see `sreebhavan_backend/docs/public-api.md`.

This is the contract between the FastAPI backend and the two Nuxt frontends. The admin panel (`apps/admin`) already
calls every **admin** endpoint below with exactly these shapes. Build the backend to match, or update this document
and `apps/admin/common/constants/apiConstants.ts` together.


---

## 1. Conventions

| Topic         | Rule                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Base path     | `/api/v1`. The frontend sets the host with `NUXT_PUBLIC_API_BASE_URL`.                                              |
| Format        | JSON, `snake_case` field names.                                                                                     |
| IDs           | Strings (UUID recommended).                                                                                         |
| Dates         | `YYYY-MM-DD` for calendar dates (`date`, `date_from`).                                                              |
| Timestamps    | ISO 8601 with timezone (`created_at`, `last_sign_in_at`).                                                           |
| Months        | `YYYY-MM` in `?month=` query params.                                                                                |
| Money         | Rupees as numbers (`2200`), no paise.                                                                               |
| Images        | Full public URLs built by the API. The frontend never builds Supabase URLs.                                         |
| Sorting       | Items with a `sort` field are returned sorted by `sort` ascending (the frontend also sorts).                        |
| Envelope      | Every JSON response is `{ success, status_code, message, data }`. The examples below show only `data`.              |
| Lists         | `data` is an array, **except** `GET /admin/enquiries`, which is paginated: `data` plus `meta` (section 6.9).        |
| Create        | `POST` returns the created object with `id`. Status 200 or 201.                                                     |
| Update        | `PATCH /{id}` receives **all editable fields** (except where marked _partial_) and returns the full updated object. |
| Delete        | `DELETE /{id}` returns 200 with `data: { id }`.                                                                     |
| Nullable text | Empty optional text is sent as `null`. Return `null` (not `""`) for empty values.                                   |
| Docs          | FastAPI's Swagger at `/docs` must stay enabled for development.                                                     |
| CORS          | Allow only the admin and user-site origins (plus localhost in development).                                         |

## 2. Authentication

- The admin signs in through **FastAPI**, which signs in with **Supabase Auth** and returns the Supabase access token.
  The frontend never talks to Supabase directly.
- Every `/admin/**` request (except `/admin/auth/login` and `/admin/auth/forgot-password`) sends
  `Authorization: Bearer <access_token>`. Verify the JWT and load the admin from `admin_users`.
- Roles: `owner`, `staff`. Routes marked **Owner only** return `403` for staff.
- Inactive admins (`active = false`) get `401`.
- A `401` on any request signs the admin out of the panel and shows the login page.

## 3. Error format

Every error uses one shape:

```json
{
  "success": false,
  "status_code": 409,
  "message": "This date and slot is already taken.",
  "errors": [
    { "field": "slot", "message": "This date and slot is already taken." }
  ]
}
```

The panel shows `message` to the admin, so write it as a plain sentence. Each `errors[].field` (snake_case, e.g.
`image_url`, or nested like `images.0.alt`) is shown under the matching form input.

| Status    | When                                                               |
| --------- | ------------------------------------------------------------------ |
| 400 / 422 | Validation failed                                                  |
| 401       | Missing, invalid or expired token; wrong password on login         |
| 403       | Staff calling an Owner-only route                                  |
| 404       | Record not found (and `GET /admin/hall` before the hall is set up) |
| 409       | Conflict: hall slot taken, duplicate slug or email                 |
| 429       | Rate limited (public enquiry form)                                 |

## 4. Enum values

| Name                       | Values                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| `role`                     | `owner`, `staff`                                                                                  |
| `slot` (hall)              | `morning`, `evening`, `full`                                                                      |
| `status` (hall booking)    | `booked`, `tentative`                                                                             |
| `status` (enquiry)         | `new`, `contacted`, `confirmed`, `cancelled`                                                      |
| `type` (enquiry)           | `room`, `hall`, `hotel`                                                                           |
| `category` (gallery album) | `rooms`, `hall`, `past-events`, `food`, `exterior`                                                |
| `folder` (upload)          | `logos`, `banners`, `menu/items`, `menu/cards`, `rooms`, `hall`, `gallery`, `testimonials`, `seo` |

## 5. Endpoint summary (admin)

| Method             | Path                                  | Notes                                |
| ------------------ | ------------------------------------- | ------------------------------------ |
| POST               | `/admin/auth/login`                   | No token                             |
| POST               | `/admin/auth/logout`                  |                                      |
| POST               | `/admin/auth/forgot-password`         | No token                             |
| GET                | `/admin/dashboard/stats?month=`       |                                      |
| GET, PUT           | `/admin/settings`                     |                                      |
| GET                | `/admin/businesses`                   |                                      |
| PATCH              | `/admin/businesses/{id}`              | No create or delete                  |
| GET, POST          | `/admin/banners`                      |                                      |
| PATCH, DELETE      | `/admin/banners/{id}`                 |                                      |
| GET, POST          | `/admin/menu/categories`              |                                      |
| PATCH, DELETE      | `/admin/menu/categories/{id}`         |                                      |
| GET, POST          | `/admin/menu/items`                   |                                      |
| PATCH, DELETE      | `/admin/menu/items/{id}`              | PATCH can be partial                 |
| GET, POST          | `/admin/menu/cards`                   |                                      |
| PATCH, DELETE      | `/admin/menu/cards/{id}`              |                                      |
| GET, POST          | `/admin/rooms`                        |                                      |
| PATCH, DELETE      | `/admin/rooms/{id}`                   |                                      |
| POST               | `/admin/rooms/{id}/images`            |                                      |
| DELETE             | `/admin/rooms/{id}/images/{image_id}` |                                      |
| GET, PUT           | `/admin/hall`                         |                                      |
| GET, POST          | `/admin/hall/packages`                |                                      |
| PATCH, DELETE      | `/admin/hall/packages/{id}`           |                                      |
| GET, POST          | `/admin/hall/images`                  |                                      |
| DELETE             | `/admin/hall/images/{id}`             |                                      |
| GET, POST          | `/admin/hall/bookings`                | GET takes `?month=`                  |
| PATCH, DELETE      | `/admin/hall/bookings/{id}`           |                                      |
| GET                | `/admin/enquiries`                    | Paginated, filtered                  |
| PATCH              | `/admin/enquiries/{id}`               | Status and notes only                |
| GET                | `/admin/enquiries/export.csv`         | Same filters as the list             |
| GET, POST          | `/admin/gallery/albums`               |                                      |
| GET, PATCH, DELETE | `/admin/gallery/albums/{id}`          | PATCH can be partial                 |
| GET, POST          | `/admin/gallery/images`               | GET takes `?album_id=`; POST is bulk |
| PATCH, DELETE      | `/admin/gallery/images/{id}`          |                                      |
| GET, POST          | `/admin/testimonials`                 |                                      |
| PATCH, DELETE      | `/admin/testimonials/{id}`            |                                      |
| GET, POST          | `/admin/faqs`                         |                                      |
| PATCH, DELETE      | `/admin/faqs/{id}`                    |                                      |
| GET, POST          | `/admin/seo`                          |                                      |
| PATCH, DELETE      | `/admin/seo/{id}`                     |                                      |
| POST               | `/admin/uploads`                      | multipart                            |
| GET, POST          | `/admin/users`                        | Owner only                           |
| PATCH, DELETE      | `/admin/users/{id}`                   | Owner only                           |
| POST               | `/admin/users/{id}/reset-password`    | Owner only                           |

---

## 6. Admin endpoints in detail

### 6.1 Auth

**`POST /admin/auth/login`** (no token)

```json
// request
{ "email": "owner@example.com", "password": "secret" }

// 200 response
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "admin": { "id": "uuid", "name": "Sajith", "email": "owner@example.com", "role": "owner" }
}
```

Return `401` for a wrong email or password, or an inactive admin. The panel keeps the session for 12 hours, so set
the Supabase JWT expiry to at least 12 hours, or add a refresh endpoint and tell the frontend.

**`POST /admin/auth/logout`**: no body. Revoke the Supabase session. Returns 200 or 204.

**`POST /admin/auth/forgot-password`** (no token)

```json
{ "email": "owner@example.com" }
```

Always return 200, whether or not the email exists, so the form can't be used to discover admin emails. Send the
Supabase reset email when the email belongs to an active admin.

### 6.2 Dashboard

**`GET /admin/dashboard/stats?month=2026-11`**

```json
{
  "new_enquiries": 4,
  "open_enquiries": 9,
  "enquiries_this_month": 23,
  "hall_bookings_this_month": 6,
  "upcoming_bookings": [
    {
      "id": "uuid",
      "date": "2026-11-12",
      "slot": "evening",
      "status": "booked",
      "customer_name": "Arun",
      "event_type": "Wedding"
    }
  ],
  "recent_enquiries": [
    {
      "id": "uuid",
      "type": "hall",
      "name": "Arun",
      "phone": "9847012345",
      "status": "new",
      "created_at": "2026-11-07T10:30:00+05:30"
    }
  ],
  "month_bookings": [
    { "date": "2026-11-12", "slot": "evening", "status": "booked" }
  ]
}
```

- `open_enquiries`: status `new` or `contacted`.
- `upcoming_bookings`: from today onward, sorted by date, up to 5. `event_type` may be `null`.
- `recent_enquiries`: newest first, up to 5.
- `month_bookings`: every booking in `month`.

### 6.3 Site settings

**`GET /admin/settings`** returns a flat object. Every key is optional and may be `null`.
**`PUT /admin/settings`** receives the whole object and returns the saved object.

```json
{
  "brand_logo_url": "https://.../logos/brand.webp",
  "favicon_url": null,
  "contact_phone": "9847000001",
  "contact_email": "hello@example.com",
  "address": "MC Road, Town, Kerala",
  "map_embed_url": "https://www.google.com/maps/embed?pb=...",
  "map_link_url": "https://maps.app.goo.gl/...",
  "facebook_url": null,
  "instagram_url": null,
  "youtube_url": null,
  "footer_text": "© Sreebhavan",
  "google_analytics_id": "G-XXXXXXXXXX",
  "search_console_verification": null
}
```

Store each key as a row in `site_settings (key, value jsonb)`.

### 6.4 Businesses

There are exactly two businesses, created by a seed migration with slugs `sreebhavan-veg-hotel` and `sreebhavanam`.
The panel can only list and edit them.

**`GET /admin/businesses`**

```json
[
  {
    "id": "uuid",
    "slug": "sreebhavan-veg-hotel",
    "name": "Sreebhavan Veg Hotel",
    "logo_url": null,
    "about": "Pure vegetarian Kerala meals.",
    "whatsapp": "9847000001",
    "phone": "04712345678",
    "timings": [{ "label": "Mon – Sun", "hours": "6:00 am – 10:00 pm" }]
  }
]
```

**`PATCH /admin/businesses/{id}`**: request body is the object above without `id` and `slug`. The slug is fixed
because it is part of the public URLs. Returns the full business. `whatsapp` is required, as a 10-digit Indian mobile
number with an optional `91` prefix.

### 6.5 Banners

```json
{
  "id": "uuid",
  "business_id": null,
  "image_url": "https://.../banners/b1.webp",
  "title": "Pure vegetarian taste of Kerala",
  "subtitle": null,
  "cta_text": "View menu",
  "cta_link": "/sreebhavan-veg-hotel/menu",
  "sort": 1,
  "active": true
}
```

`business_id: null` means the banner is for the home page. Required: `image_url`, `title`. The list, create and
update endpoints follow the standard pattern in section 1.

### 6.6 Menu

**Category**

```json
{
  "id": "uuid",
  "name": "Breakfast",
  "name_ml": "പ്രഭാതഭക്ഷണം",
  "slug": "breakfast",
  "image_url": null,
  "sort": 1,
  "active": true
}
```

**Food item**

```json
{
  "id": "uuid",
  "category_id": "uuid",
  "name": "Masala Dosa",
  "name_ml": "മസാല ദോശ",
  "slug": "masala-dosa",
  "price": 70,
  "image_url": null,
  "description": null,
  "is_special": true,
  "is_available": true,
  "sort": 1
}
```

`PATCH /admin/menu/items/{id}` is also called with **partial** bodies by the quick toggles in the list:
`{ "is_available": false }` or `{ "is_special": true }`. Update only the fields sent.

**Menu card** (PDF or image)

```json
{
  "id": "uuid",
  "title": "Full menu",
  "file_url": "https://.../menu/cards/menu.pdf",
  "active": true
}
```

Rules:

- `slug` is unique per table: return `409` on a duplicate. Allowed format: `^[a-z0-9]+(-[a-z0-9]+)*$`.
- Deleting a category that still has items returns `409` with a clear message.

### 6.7 Rooms

```json
{
  "id": "uuid",
  "slug": "deluxe-ac-room",
  "name": "Deluxe AC Room",
  "price": 2200,
  "capacity": 2,
  "amenities": ["AC", "Wi-Fi", "TV"],
  "description": null,
  "active": true,
  "images": [
    {
      "id": "uuid",
      "url": "https://.../rooms/r1.webp",
      "alt": "Deluxe room with double bed",
      "sort": 0
    }
  ]
}
```

- `GET /admin/rooms` includes `images` for each room, sorted by `sort`.
- The `POST` and `PATCH` bodies leave out `id` and `images`.
- **`POST /admin/rooms/{id}/images`**: request `{ "url": "...", "alt": "...", "sort": 1 }`, returns the image. `alt` is required.
- **`DELETE /admin/rooms/{id}/images/{image_id}`**.

### 6.8 Event hall

**`GET /admin/hall`**: the single hall record. Return `404` until it has been saved once; the panel then shows an
empty form. **`PUT /admin/hall`** creates or replaces it and returns it.

```json
{
  "name": "Sreebhavanam Hall",
  "capacity_seating": 600,
  "capacity_floating": 900,
  "facilities": ["AC", "Stage", "Parking"],
  "rules": "No outside catering.\nMusic till 10 pm."
}
```

**Package**

```json
{
  "id": "uuid",
  "name": "Wedding – full day",
  "price": 85000,
  "inclusions": ["Hall for 12 hours", "Stage decoration"],
  "sort": 1
}
```

**Hall photos**: `GET /admin/hall/images` returns `[{ "id", "url", "alt", "sort" }]`. `POST` takes
`{ "url", "alt", "sort" }`. `DELETE /admin/hall/images/{id}`.

**Hall booking (calendar)**

```json
{
  "id": "uuid",
  "date": "2026-11-12",
  "slot": "evening",
  "status": "booked",
  "customer_name": "Arun",
  "phone": "9847012345",
  "event_type": "Wedding",
  "notes": null
}
```

- **`GET /admin/hall/bookings?month=2026-11`**: every booking in that month.
- `POST` and `PATCH /{id}` take the object without `id`. `DELETE /{id}` frees the slot.
- Set `created_by` from the token.

> **Double-booking rule (must be enforced in the API, not only by the database).**
> A `full` booking blocks `morning` and `evening` on the same date, and a `morning` or `evening` booking blocks `full`.
> `UNIQUE(date, slot)` alone does **not** stop a `full` and a `morning` booking on the same date. Check overlaps
> inside a transaction (or use an exclusion constraint) and return **`409`** on a conflict. On `PATCH`, ignore the
> booking being edited.

### 6.9 Enquiries

**`GET /admin/enquiries?type=hall&status=new&q=arun&page=1&per_page=20`**: all filters are optional.
`q` searches name and phone. Newest first.

```json
{
  "items": [
    {
      "id": "uuid",
      "type": "hall",
      "name": "Arun",
      "phone": "9847012345",
      "email": null,
      "date_from": "2026-12-12",
      "date_to": null,
      "slot": "evening",
      "guests": 400,
      "event_type": "Wedding",
      "room_id": null,
      "room_name": null,
      "message": "Need stage decoration too.",
      "status": "new",
      "admin_notes": null,
      "created_at": "2026-11-07T10:30:00+05:30"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total_records": 37,
    "total_pages": 2
  }
}
```

(The response shows the envelope's `data` and `meta`; `success`, `status_code` and `message` are left out.)

`room_name` is joined from `rooms` for room enquiries.

**`PATCH /admin/enquiries/{id}`**: partial; the panel only changes these two fields.

```json
{ "status": "contacted", "admin_notes": "Called back, visiting Saturday." }
```

**`GET /admin/enquiries/export.csv?type=&status=&q=`**: returns `text/csv` of every matching enquiry (not paginated).
The panel saves it as `enquiries-YYYY-MM-DD.csv`.

### 6.10 Gallery

**Album**

```json
{
  "id": "uuid",
  "slug": "wedding-arun-meera",
  "title": "Wedding of Arun & Meera",
  "category": "past-events",
  "cover_url": "https://.../gallery/cover.webp",
  "sort": 1,
  "active": true,
  "image_count": 24
}
```

- `image_count` is computed and read-only. It is returned by `GET /admin/gallery/albums` and `GET /admin/gallery/albums/{id}`.
- `POST` and `PATCH` bodies: `{ slug, title, category, cover_url, sort, active }`.
- `PATCH /admin/gallery/albums/{id}` is also called **partially** with `{ "cover_url": "..." }` ("Set as cover").
- `DELETE` an album deletes its images as well.

**Image**

```json
{
  "id": "uuid",
  "album_id": "uuid",
  "url": "https://.../gallery/img.webp",
  "thumb_url": "https://.../gallery/img_thumb.webp",
  "alt": "Bride and groom on stage",
  "caption": null,
  "sort": 3
}
```

- **`GET /admin/gallery/images?album_id={id}`**.
- **`POST /admin/gallery/images`** (bulk; the files were already uploaded through `/admin/uploads`):

```json
{
  "album_id": "uuid",
  "images": [
    {
      "url": "...",
      "thumb_url": "...",
      "alt": "Required alt text",
      "caption": null,
      "sort": 3
    }
  ]
}
```

- **`PATCH /admin/gallery/images/{id}`**: `{ "alt", "caption", "sort" }`.
- **`DELETE /admin/gallery/images/{id}`**.
- `alt` is required on every image: return `422` if it is empty.

### 6.11 Testimonials

```json
{
  "id": "uuid",
  "name": "Lakshmi",
  "text": "Best masala dosa in town.",
  "rating": 5,
  "business_id": "uuid",
  "sort": 1,
  "active": true
}
```

`rating` is 1–5. `business_id` may be `null` (both businesses).

### 6.12 FAQs

```json
{
  "id": "uuid",
  "business_id": null,
  "question": "How many guests does the hall seat?",
  "answer": "600 seated.",
  "sort": 1
}
```

`business_id: null` means a general FAQ.

### 6.13 SEO

```json
{
  "id": "uuid",
  "page_key": "rooms",
  "title": "Rooms in Town | Sreebhavanam",
  "description": "Clean AC and non-AC rooms...",
  "og_image": null,
  "keywords": "rooms in town, ac rooms",
  "noindex": false
}
```

- `page_key` is unique. Pages: `home`, `hotel`, `menu`, `sreebhavanam`, `rooms`, `event-hall`, `hall-availability`,
  `gallery`, `about`, `contact`, `faq`. Items: `<type>/<slug>`, e.g. `room/deluxe-ac-room`, `menu/breakfast`,
  `gallery/wedding-arun-meera`. Format: `^[a-z0-9-]+(/[a-z0-9-]+)?$`.
- Limits the panel enforces: `title` up to 60 characters, `description` up to 160.

### 6.14 Uploads

**`POST /admin/uploads`**: `multipart/form-data` with fields `file` and `folder` (a value from the `folder` enum).

```json
{
  "url": "https://<project>.supabase.co/storage/v1/object/public/rooms/abc.webp",
  "thumb_url": "https://.../abc_thumb.webp"
}
```

- Images (`jpeg`, `png`, `webp`): resize to a sensible maximum width, convert to WebP, make a thumbnail, and return both URLs.
- `menu/cards` also accepts **PDF** (stored as is; `thumb_url` is `null`).
- `logos` also accepts **SVG** and **ICO** (stored as is).
- Maximum 5 MB. Check the real file type, not just the extension. Return `422` with a message on rejection.
- The panel uploads first, then saves the returned `url` in the related record. Files whose record is never saved
  are orphans: clean them up with a periodic job.

### 6.15 Admin users (Owner only)

```json
{
  "id": "uuid",
  "name": "Front Desk",
  "email": "staff@example.com",
  "role": "staff",
  "active": true,
  "last_sign_in_at": null
}
```

- **`POST /admin/users`**: `{ name, email, role, active }`. Invite through Supabase Auth (`invite_user_by_email`);
  the user sets their own password. `409` if the email already exists.
- **`PATCH /admin/users/{id}`**: `{ name, email, role, active }`. The email is shown but locked in the panel; ignore changes to it.
- **`DELETE /admin/users/{id}`**: remove the admin row and disable the Supabase user.
- **`POST /admin/users/{id}/reset-password`**: send a Supabase password-reset email.
- An owner cannot delete, deactivate or demote **themselves**. The panel hides those actions, but the API must also
  refuse them (`409`), so there is always at least one active owner.
- Write admin actions to `activity_logs` (`user_id`, `action`, `entity`, `entity_id`). There is no panel screen for this yet.

---

## 7. Public endpoints (user website, planned)

These come from the project plan and will be used by `apps/web`, which is not built yet. Shapes will be fixed when
that work starts. They need no token, are read-only (except the enquiry form) and should be cached.

| Method | Path                                                      | Notes                                                                            |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| GET    | `/public/settings`                                        | Same keys as admin settings, minus anything private                              |
| GET    | `/public/businesses/{slug}`                               |                                                                                  |
| GET    | `/public/banners`                                         | Active only                                                                      |
| GET    | `/public/menu/categories`                                 | Active only                                                                      |
| GET    | `/public/menu/items?category=&special=`                   | Available items                                                                  |
| GET    | `/public/menu/cards`                                      | Active only                                                                      |
| GET    | `/public/rooms`, `/public/rooms/{slug}`                   | Active only, with images                                                         |
| GET    | `/public/hall`, `/public/hall/packages`                   |                                                                                  |
| GET    | `/public/hall/availability?month=YYYY-MM`                 | `[{ date, slot, status }]` only. **Never** expose customer name, phone or notes. |
| GET    | `/public/gallery/albums`, `/public/gallery/albums/{slug}` | Active only                                                                      |
| GET    | `/public/testimonials`, `/public/faqs`                    |                                                                                  |
| GET    | `/public/seo/{page_key}`                                  |                                                                                  |
| GET    | `/public/sitemap-data`                                    | Slugs and `updated_at` for rooms, menu categories and albums                     |
| POST   | `/public/enquiries`                                       | Saves the enquiry, returns `{ "id", "whatsapp_url" }`                            |

`POST /public/enquiries` must:

1. Validate the input (Pydantic) and check a honeypot field or Cloudflare Turnstile token.
2. Apply rate limiting per IP (return `429`).
3. Save the enquiry with status `new` **before** returning.
4. Build the `wa.me` link to the correct business's WhatsApp number, with the message pre-filled.

## 8. Database notes

- Follow the 21-table schema in the project plan. Every table has `created_at` and `updated_at`; every change goes
  through an Alembic migration.
- Row-level security is on for every table, and public roles cannot write. Only FastAPI holds the service key.
- Unique constraints: `slug` on `menu_categories`, `menu_items`, `rooms`, `gallery_albums`, `businesses`;
  `page_key` on `seo_meta`; `email` on admin users; `(date, slot)` on `hall_bookings`, plus the overlap check in 6.8.
- Seed migration: the two businesses (section 6.4) and the first owner account.
