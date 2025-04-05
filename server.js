const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Translation route
app.post('/translate', async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios.post('https://libretranslate.de/translate', {
      q: text,
      source: source,
      target: target,
      format: "text"
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});
