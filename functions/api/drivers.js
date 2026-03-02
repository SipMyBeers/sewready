// /api/drivers — GET list, POST create drivers

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/drivers?shop=slug
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const shop = url.searchParams.get('shop');
  if (!shop) return json({ error: 'shop parameter required' }, 400);

  try {
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM drivers WHERE shop_slug = ? ORDER BY name'
    ).bind(shop).all();
    return json(results);
  } catch (err) {
    return json({ error: 'Failed to list drivers' }, 500);
  }
}

// POST /api/drivers — create driver
export async function onRequestPost(context) {
  try {
    const { shop_slug, name, phone, vehicle } = await context.request.json();
    if (!shop_slug || !name) return json({ error: 'shop_slug and name required' }, 400);

    const id = crypto.randomUUID();
    await context.env.DB.prepare(
      'INSERT INTO drivers (id, shop_slug, name, phone, vehicle) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, shop_slug, name, phone || null, vehicle || null).run();

    return json({ id, shop_slug, name, phone, vehicle, active: 1 }, 201);
  } catch (err) {
    return json({ error: 'Failed to create driver' }, 500);
  }
}
