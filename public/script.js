async function translateText() {
  const text = document.getElementById("input-text").value;
  const sourceLang = document.getElementById("sourcelang").value;
  const targetLang = document.getElementById("targetlang").value;

  try {
    const res = await fetch("http://localhost:3000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source: sourceLang, target: targetLang })
    });

    const data = await res.json();
    document.getElementById("output-text").value = data.translatedText || "Translation failed.";
  } catch (err) {
    document.getElementById("output-text").value = "Error while translating. Try again.";
  }
}
