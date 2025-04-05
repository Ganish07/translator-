async function translateText() {
  const inputText = document.getElementById("input-text").value.trim();
  const inputLang = document.getElementById("input-lang").value;
  const outputLang = document.getElementById("output-lang").value;
  const outputBox = document.getElementById("output-text");

  if (!inputText) {
    outputBox.value = "Please enter some text to translate.";
    return;
  }

  outputBox.value = "Translating...";

  try {
    const res = await fetch("http://localhost:3000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: inputText, source: inputLang, target: outputLang })
    });

    const data = await res.json();
    outputBox.value = data.translatedText || "Something went wrong.";
  } catch (err) {
    outputBox.value = "Error while translating. Try again.";
    console.error(err);
  }
}
