require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Check if .env is working correctly
console.log("🔑 Loaded RapidAPI Key:", process.env.RAPIDAPI_KEY ? "✔️ Loaded" : "❌ Missing");

// POST /translate route
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

    const translated = response.data.data.translations[0].
