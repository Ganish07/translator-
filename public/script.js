async function translateText() {
  const text = document.getElementById("input-text").value;
  const sourceLang = document.getElementById("sourcelang").value;
  const targetLang = document.getElementById("targetlang").value;

  try {
    const response = await fetch("https://translate.argosopentech.com/translate", {
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
    }
  } catch (error) {
    console.error(error);
    document.getElementById("output-text").value = "Error while translating. Try again.";
  }
}
