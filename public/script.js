async function translateText() {
  const text = document.getElementById("input-text").value;
  const sourceLang = document.getElementById("sourcelang").value;
  const targetLang = document.getElementById("targetlang").value;

  try {
   const response = await fetch("https://translator-8sxa.onrender.com/translate", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        source: sourceLang,
        target: targetLang
      })
    });

    const data = await response.json();
    document.getElementById("output-text").value = data.translatedText || "Translation failed.";
  } catch (error) {
    console.error("Translation error:", error);
    document.getElementById("output-text").value = "Error while translating. Try again.";
  }
}
