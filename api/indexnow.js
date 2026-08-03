const INDEXNOW_KEY = "2b7f5f32-5ea1-43a6-9a9d-97af27054e5b";
const HOST = "portfolio.lindocode.com";

const URLS = [`https://${HOST}/`];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "POST only" });
    return;
  }

  try {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: URLS,
      }),
    });

    if (r.ok || r.status === 202) {
      res.status(200).json({ success: true, submitted: URLS.length });
      return;
    }

    res.status(502).json({ success: false, status: r.status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
