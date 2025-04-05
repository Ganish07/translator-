require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
      data: new URLSearchParams({
        q: text,
        source,
        target,
        format: 'text',
      }),
    });

    res.json({ translatedText: response.data.data.translations[0].translatedText });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
