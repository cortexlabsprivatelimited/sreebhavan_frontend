/**
 * Development-only fake of the FastAPI backend, served at /api/v1/** by the Nuxt dev server.
 * Enabled only by `npm run dev:mock` (MOCK_API=true); never part of a normal build.
 * Data lives in memory and resets when the dev server restarts.
 */
import {
  createError,
  defineEventHandler,
  getHeader,
  getMethod,
  getQuery,
  readBody,
  readMultipartFormData,
  setResponseHeader,
  setResponseStatus,
  type H3Event,
} from 'h3';
import { createMockSeedData, mockHall, mockSiteSettings } from './mockSeedData';

type MockRecord = Record<string, unknown> & { id: string };

interface MockState {
  collections: Record<string, MockRecord[]>;
  settings: Record<string, unknown>;
  hall: Record<string, unknown> | null;
  files: Map<string, { data: Buffer; type: string }>;
}

// Kept on globalThis so hot reloads of this file do not wipe the data.
const globalStore = globalThis as typeof globalThis & { sreebhavanMockState?: MockState };
const state: MockState = (globalStore.sreebhavanMockState ??= {
  collections: createMockSeedData(),
  settings: { ...mockSiteSettings },
  hall: { ...mockHall },
  files: new Map(),
});

/** Plain CRUD collections: URL base → collection name. */
const crudCollections: Record<string, string> = {
  '/admin/businesses': 'businesses',
  '/admin/banners': 'banners',
  '/admin/menu/categories': 'menuCategories',
  '/admin/menu/items': 'menuItems',
  '/admin/menu/cards': 'menuCards',
  '/admin/rooms': 'rooms',
  '/admin/hall/packages': 'hallPackages',
  '/admin/hall/images': 'hallImages',
  '/admin/hall/bookings': 'hallBookings',
  '/admin/enquiries': 'enquiries',
  '/admin/gallery/albums': 'galleryAlbums',
  '/admin/gallery/images': 'galleryImages',
  '/admin/testimonials': 'testimonials',
  '/admin/faqs': 'faqs',
  '/admin/seo': 'seo',
  '/admin/users': 'users',
};

const collection = (name: string): MockRecord[] => (state.collections[name] ??= []);
const newId = () => Math.random().toString(36).slice(2, 10);
const fail = (statusCode: number, message: string) =>
  createError({ statusCode, data: { error: { code: String(statusCode), message } } });

const findOrFail = (name: string, id: string): MockRecord => {
  const record = collection(name).find((item) => item.id === id);
  if (!record) throw fail(404, 'Not found.');
  return record;
};

const overlaps = (firstSlot: unknown, secondSlot: unknown) =>
  firstSlot === secondSlot || firstSlot === 'full' || secondSlot === 'full';

const assertHallSlotFree = (booking: Record<string, unknown>, ignoredId?: string) => {
  const conflict = collection('hallBookings').find(
    (existing) =>
      existing.id !== ignoredId &&
      existing.date === booking.date &&
      overlaps(existing.slot, booking.slot),
  );
  if (conflict) throw fail(409, 'This date and slot is already taken.');
};

const handleUpload = async (event: H3Event) => {
  const parts = (await readMultipartFormData(event)) ?? [];
  const filePart = parts.find((part) => part.name === 'file');
  if (!filePart) throw fail(422, 'No file uploaded.');
  const fileId = newId();
  state.files.set(fileId, {
    data: filePart.data,
    type: filePart.type ?? 'application/octet-stream',
  });
  const extension = filePart.type === 'application/pdf' ? '.pdf' : '';
  const url = `/api/v1/mock-files/${fileId}${extension}`;
  return { url, thumb_url: url };
};

const buildDashboardStats = (month: string) => {
  const enquiries = collection('enquiries');
  const bookings = collection('hallBookings');
  const today = new Date().toISOString().slice(0, 10);
  const monthBookings = bookings.filter((booking) => String(booking.date).startsWith(month));
  return {
    new_enquiries: enquiries.filter((enquiry) => enquiry.status === 'new').length,
    open_enquiries: enquiries.filter((enquiry) =>
      ['new', 'contacted'].includes(String(enquiry.status)),
    ).length,
    enquiries_this_month: enquiries.filter((enquiry) =>
      String(enquiry.created_at).startsWith(month),
    ).length,
    hall_bookings_this_month: monthBookings.length,
    upcoming_bookings: bookings
      .filter((booking) => String(booking.date) >= today)
      .sort((first, second) => String(first.date).localeCompare(String(second.date)))
      .slice(0, 5),
    recent_enquiries: [...enquiries]
      .sort((first, second) => String(second.created_at).localeCompare(String(first.created_at)))
      .slice(0, 5),
    month_bookings: monthBookings.map(({ date, slot, status }) => ({ date, slot, status })),
  };
};

const filterEnquiries = (query: Record<string, unknown>) => {
  const search = String(query.q ?? '').toLowerCase();
  return collection('enquiries')
    .filter((enquiry) => !query.type || enquiry.type === query.type)
    .filter((enquiry) => !query.status || enquiry.status === query.status)
    .filter(
      (enquiry) =>
        !search ||
        String(enquiry.name).toLowerCase().includes(search) ||
        String(enquiry.phone).includes(search),
    )
    .sort((first, second) => String(second.created_at).localeCompare(String(first.created_at)));
};

const toCsv = (rows: MockRecord[]) => {
  const columns = [
    'created_at',
    'type',
    'name',
    'phone',
    'email',
    'date_from',
    'date_to',
    'slot',
    'guests',
    'status',
  ];
  const escape = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => escape(row[column])).join(',')),
  ].join('\n');
};

/** Routes that need more than plain CRUD. Returns undefined when the path is not special. */
const handleSpecialRoute = async (event: H3Event, method: string, path: string) => {
  const query = getQuery(event);

  if (path === '/admin/auth/login' && method === 'POST') {
    const body = await readBody<{ email?: string }>(event);
    const email = body?.email || 'owner@sreebhavan.test';
    return {
      access_token: `mock-token-${newId()}`,
      token_type: 'bearer',
      admin: { id: 'user-owner', name: 'Demo Owner', email, role: 'owner' },
    };
  }
  if (path === '/admin/auth/logout' || path === '/admin/auth/forgot-password') return { ok: true };
  if (path === '/admin/uploads' && method === 'POST') return handleUpload(event);
  if (path === '/admin/dashboard/stats') {
    return buildDashboardStats(String(query.month ?? new Date().toISOString().slice(0, 7)));
  }

  if (path === '/admin/settings') {
    if (method === 'PUT') state.settings = { ...(await readBody<Record<string, unknown>>(event)) };
    return state.settings;
  }
  if (path === '/admin/hall') {
    if (method === 'PUT') state.hall = { ...(await readBody<Record<string, unknown>>(event)) };
    if (!state.hall) throw fail(404, 'Hall not set up yet.');
    return state.hall;
  }

  if (path === '/admin/hall/bookings' && method === 'GET') {
    return collection('hallBookings').filter((booking) =>
      String(booking.date).startsWith(String(query.month ?? '')),
    );
  }
  if (path === '/admin/hall/bookings' && method === 'POST') {
    const body = await readBody<Record<string, unknown>>(event);
    assertHallSlotFree(body);
    const booking = { ...body, id: newId() };
    collection('hallBookings').push(booking);
    return booking;
  }
  const bookingMatch = path.match(/^\/admin\/hall\/bookings\/([^/]+)$/);
  if (bookingMatch?.[1] && method === 'PATCH') {
    const body = await readBody<Record<string, unknown>>(event);
    assertHallSlotFree(body, bookingMatch[1]);
    return Object.assign(findOrFail('hallBookings', bookingMatch[1]), body);
  }

  if (path === '/admin/enquiries' && method === 'GET') {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.page_size ?? 20);
    const matches = filterEnquiries(query);
    return {
      items: matches.slice((page - 1) * pageSize, page * pageSize),
      total: matches.length,
      page,
      page_size: pageSize,
    };
  }
  if (path === '/admin/enquiries/export.csv') {
    setResponseHeader(event, 'Content-Type', 'text/csv');
    return toCsv(filterEnquiries(query));
  }

  if (path === '/admin/gallery/albums' && method === 'GET') {
    return collection('galleryAlbums').map((album) => ({
      ...album,
      image_count: collection('galleryImages').filter((image) => image.album_id === album.id)
        .length,
    }));
  }
  if (path === '/admin/gallery/images' && method === 'GET') {
    return collection('galleryImages').filter((image) => image.album_id === query.album_id);
  }
  if (path === '/admin/gallery/images' && method === 'POST') {
    const body = await readBody<{ album_id: string; images: Record<string, unknown>[] }>(event);
    const created = body.images.map((image) => ({
      ...image,
      id: newId(),
      album_id: body.album_id,
    }));
    collection('galleryImages').push(...created);
    return created;
  }

  const roomImagesMatch = path.match(/^\/admin\/rooms\/([^/]+)\/images(?:\/([^/]+))?$/);
  if (roomImagesMatch?.[1]) {
    const room = findOrFail('rooms', roomImagesMatch[1]);
    const images = (room.images as MockRecord[] | undefined) ?? [];
    if (method === 'POST') {
      const image = { ...(await readBody<Record<string, unknown>>(event)), id: newId() };
      room.images = [...images, image];
      return image;
    }
    if (method === 'DELETE' && roomImagesMatch[2]) {
      room.images = images.filter((image) => image.id !== roomImagesMatch[2]);
      return { ok: true };
    }
    return images;
  }

  if (/^\/admin\/users\/[^/]+\/reset-password$/.test(path)) return { ok: true };
  return undefined;
};

const handleCrudRoute = async (event: H3Event, method: string, path: string) => {
  const base = Object.keys(crudCollections)
    .sort((first, second) => second.length - first.length)
    .find((candidate) => path === candidate || path.startsWith(`${candidate}/`));
  if (!base) throw fail(404, `Mock API has no route for ${method} ${path}`);

  const name = crudCollections[base] ?? '';
  const id = path.slice(base.length + 1);

  if (!id && method === 'GET') return collection(name);
  if (!id && method === 'POST') {
    const record: MockRecord = { ...(await readBody<Record<string, unknown>>(event)), id: newId() };
    if (name === 'rooms') record.images = [];
    if (name === 'users') record.last_sign_in_at = null;
    collection(name).push(record);
    return record;
  }
  if (id && method === 'GET') return findOrFail(name, id);
  if (id && (method === 'PATCH' || method === 'PUT')) {
    return Object.assign(findOrFail(name, id), await readBody<Record<string, unknown>>(event));
  }
  if (id && method === 'DELETE') {
    findOrFail(name, id);
    state.collections[name] = collection(name).filter((record) => record.id !== id);
    if (name === 'galleryAlbums') {
      state.collections.galleryImages = collection('galleryImages').filter(
        (image) => image.album_id !== id,
      );
    }
    setResponseStatus(event, 200);
    return { ok: true };
  }
  throw fail(405, 'Method not allowed.');
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const path = (event.path.split('?')[0] ?? '').replace(/^\/api\/v1/, '');

  const fileMatch = path.match(/^\/mock-files\/([a-z0-9]+)/);
  if (fileMatch?.[1]) {
    const file = state.files.get(fileMatch[1]);
    if (!file) throw fail(404, 'File not found.');
    setResponseHeader(event, 'Content-Type', file.type);
    return file.data;
  }

  const isLoginRequest = path === '/admin/auth/login';
  if (path.startsWith('/admin') && !isLoginRequest && !getHeader(event, 'authorization')) {
    throw fail(401, 'Please sign in.');
  }

  // Small delay so loading states are visible, like a real network.
  await new Promise((resolve) => setTimeout(resolve, 250));

  const specialResult = await handleSpecialRoute(event, method, path);
  return specialResult ?? handleCrudRoute(event, method, path);
});
