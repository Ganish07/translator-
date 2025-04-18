const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set('q', text);
  encodedParams.set('target', targetLanguage);
  encodedParams.set('source', 'en');

  try {
    const response = await axios.post('https://google-translate1.p.rapidapi.com/language/translate/v2', encodedParams, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
    });

    const translatedText = response.data.data.translations[0].translatedText;
    res.json({ translatedText });
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error("Server error:", err);
});
