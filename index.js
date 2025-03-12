const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url, selector } = req.body;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const element = $(selector).first();
    const href = element.attr('href');
    res.json({ href: href || null });
  } catch (error) {
    res.status(500).json({ error: '取得エラー', detail: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Scraping API running on port ${PORT}`);
});
