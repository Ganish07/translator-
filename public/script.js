async function translateText() {
  const text = document.getElementById("inputText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, source: sourceLang, target: targetLang })
    });

    const data = await response.json();
    document.getElementById("outputText").value = data.translatedText;
  } catch (error) {
    document.getElementById("outputText").value = "Error while translating. Try again.";
  }
}
