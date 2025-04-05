<script>
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
        body: JSON.stringify({
          text: text,
          source: sourceLang,
          target: targetLang
        })
      });

      const data = await response.json();

      if (data.translatedText) {
        document.getElementById("outputText").value = data.translatedText;
      } else {
        document.getElementById("outputText").value = "Translation failed.";
      }
    } catch (error) {
      document.getElementById("outputText").value = "Error while translating. Try again.";
    }
  }
</script>
