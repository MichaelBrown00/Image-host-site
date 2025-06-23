import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const rawBody = await buffer(req);
    const body = JSON.parse(rawBody.toString());
    const { imageData } = body;

    const imgbbKey = process.env.IMGBB_API_KEY;

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: new URLSearchParams({
        key: imgbbKey,
        image: imageData,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      throw new Error('Invalid response from ImgBB: ' + text);
    }

    if (!result.success) {
      throw new Error(result.error.message);
    }

    res.status(200).json({ url: result.data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
