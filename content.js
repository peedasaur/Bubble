document.addEventListener("keydown", async (e) => {
  if (e.altKey && e.key.toLowerCase() === "x") {
    const selection = window.getSelection().toString().trim();
    if (!selection || selection.length < 5) return;

    const answer = await fetchAnswerFromGemini(selection);
    if (answer) showAnswerPopup(answer);
  }
});

async function fetchAnswerFromGemini(question) {
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDvuj5oOHEBLMYq7ShmamXDSLoqnwAvLRY", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Only reply with the correct option like "A-mars" for this question:\n\n${question}`
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

function showAnswerPopup(answer) {
  const box = document.createElement("div");
  box.textContent = answer;
  box.style.position = "fixed";
  box.style.top = "20px";
  box.style.left = "20px";
  box.style.background = "#222";
  box.style.color = "#fff";
  box.style.padding = "8px 12px";
  box.style.borderRadius = "8px";
  box.style.zIndex = "9999";
  box.style.fontSize = "14px";
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 2500);
}
