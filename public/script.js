async function translateText() {
  const text = document.getElementById("input-text").value;
  const sourceLang = document.getElementById("sourcelang").value;
  const targetLang = document.getElementById("targetlang").value;

  if (!text.trim()) {
    document.getElementById("output-text").value = "Please enter some text to translate.";
    return;
  }

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text"
      })
    });

    const data = await response.json();

    if (data.translatedText) {
      document.getElementById("output-text").value = data.translatedText;
    } else {
      document.getElementById("output-text").value = "Translation failed.";
      console.error("Response error:", data);
    }
  } catch (error) {
    document.getElementById("output-text").value = "Error while translating. Try again.";
    console.error("Error during fetch:", error);
  }
}
