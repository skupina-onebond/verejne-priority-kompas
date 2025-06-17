// src/lib/deepSearch.ts
export async function deepSearch(subjectName: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return "❌ API key (VITE_OPENAI_API_KEY) nebyl načten. Zkontroluj .env soubor a restartuj server.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // najlacnejší vhodný model
        messages: [
          {
            role: "system",
            content:
              "Jsi asistent pro analýzu veřejných zakázek. Pomáháš úředníkům vyhodnotit rizika spojená se subjekty zadávajícími zakázky.",
          },
          {
            role: "user",
            content: `Prověř subjekt s názvem: "${subjectName}". Dej mi přehledné shrnutí o jeho důvěryhodnosti, historických aktivitách ve veřejných zakázkách a případných rizicích.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("DeepSearch API error:", errText);
      return `❌ API odpověď: ${response.status} – ${response.statusText}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "⚠️ Odpověď byla prázdná.";
  } catch (err) {
    console.error("DeepSearch výjimka:", err);
    return "❌ Došlo k chybě při volání DeepSearch.";
  }
}
