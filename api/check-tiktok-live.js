export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    const response = await fetch(`https://www.tiktok.com/@${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const html = await response.text();

    const liveMatch = html.match(/"isLive"\s*:\s*true/i);
    const isLive = !!liveMatch;

    let followerCount = 0;
    const followerMatch = html.match(/"followerCount"\s*:\s*(\d+)/i);
    if (followerMatch) {
      followerCount = parseInt(followerMatch[1], 10);
    }

    return res.status(200).json({ isLive, followerCount, username });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check TikTok status', details: error.message });
  }
}
