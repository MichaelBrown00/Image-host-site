export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileName, fileContent } = req.body;

    if (!fileName || !fileContent) {
      return res.status(400).json({ error: "Missing data" });
    }

    const buffer = Buffer.from(fileContent, "base64");

    const savePath = `/tmp/${fileName}`;

    require("fs").writeFileSync(savePath, buffer);

    res.status(200).json({
      success: true,
      url: `https://${req.headers.host}/api/readFile?file=${fileName}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
