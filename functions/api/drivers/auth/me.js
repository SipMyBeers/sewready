// GET /api/drivers/auth/me — return current driver session info

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestGet(context) {
  // context.driver is set by _middleware.js
  return json({ driver: context.driver });
}
