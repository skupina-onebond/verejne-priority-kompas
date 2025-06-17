// src/lib/deepSearch.ts
export async function deepSearch(subjectName: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Jsi asistent pro analýzu veřejných zakázek. Pomáháš úředníkům vyhodnotit rizika spojená se subjekty zadávajícími zakázky.",
        },
        {
          role: "user",
          content: `Prověř subjekt s názvem: "${subjectName}". Dej mi přehledné shrnutí o jeho důvěryhodnosti, historických aktivitách ve veřejných zakázkách a případných rizicích.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("DeepSearch selhalo.");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
