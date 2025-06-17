export async function deepSearch(subjectName: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return "❌ API key (VITE_OPENAI_API_KEY) nebyl načten. Zkontroluj .env soubor a restartuj server.";
  }

  return `🧪 Test výstup: DeepSearch by hledal info o subjektu "${subjectName}" pomocí klíče ${apiKey.slice(0, 10)}...`;
}
