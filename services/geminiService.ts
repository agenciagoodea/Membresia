
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePastoralInsight(context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um consultor eclesiástico sênior especialista na Visão Celular. Com base nos seguintes dados da igreja, forneça 3 sugestões estratégicas para acelerar a Escada do Sucesso (Ganhar, Consolidar, Discipular e Enviar). Dados: ${context}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insight:", error);
    return "Não foi possível gerar insights no momento. Verifique sua conexão.";
  }
}

export async function generateSermonDraft(theme: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Crie um esboço de sermão impactante para uma célula com o tema: "${theme}". Inclua um texto base bíblico, 3 pontos principais e uma aplicação prática voltada para evangelismo (Ganhar).`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating sermon:", error);
    return "Erro ao gerar esboço de sermão.";
  }
}
