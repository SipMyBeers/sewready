// CORS middleware for all /api routes

const ALLOWED_ORIGINS = [
  'https://sewing.ranger-beers.com',
  'https://sewready.com',
  'http://localhost:8788',
];

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return null;
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (origin.endsWith('.pages.dev')) return origin; // Cloudflare preview deploys
  return null;
}

export async function onRequest(context) {
  const { request } = context;
  const origin = getAllowedOrigin(request);

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...(origin && { 'Access-Control-Allow-Origin': origin }),
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = await context.next();

  if (origin) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', origin);
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    newHeaders.set('Access-Control-Allow-Credentials', 'true');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}
