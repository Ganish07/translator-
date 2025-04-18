require('dotenv').config(); // Load env variables

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/translate', async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: new URLSearchParams({
        q: text,
        source,
        target,
        format: 'text'
      })
    });

    const translated = response.data.data.translations[0].translatedText;
    res.json({ translatedText: translated });

  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
}) .on('error,(err) => {
      console.error('server failed to start:',err);
});
