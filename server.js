const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  const { q, source, target } = req.body;

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q,
      source,
      target,
      format: "text"
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});
