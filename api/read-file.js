import fs from "fs";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const fileName = req.query.file;
    const file = `/tmp/${fileName}`;

    if (!fs.existsSync(file)) {
      return res.status(404).json({ error: "File not found" });
    }

    const data = fs.readFileSync(file);
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
