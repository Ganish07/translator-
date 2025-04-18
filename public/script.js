async function translateText() {
  const text = document.getElementById("input-text").value;
  const sourceLang = document.getElementById("sourcelang").value;
  const targetLang = document.getElementById("targetlang").value;

  if (!text.trim()) {
    document.getElementById("output-text").value = "Please enter some text to translate.";
    return;
  }

  try {
    const response = await fetch("/translate", { ... }); 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        source: sourceLang,
        target: targetLang
      })
    });

    const data = await response.json();

    if (data.translatedText) {
      document.getElementById("output-text").value = data.translatedText;
    } else {
      document.getElementById("output-text").value = "Translation failed.";
      console.error("Backend response error:", data);
    }
  } catch (error) {
    document.getElementById("output-text").value = "Error while translating. Try again.";
    console.error("Fetch error:", error);
  }
}
