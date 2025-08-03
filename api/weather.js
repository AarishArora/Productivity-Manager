export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const city = req.query.city || "New Delhi";

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );

  if (!response.ok) {
    return res.status(500).json({ error: "API request failed" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
