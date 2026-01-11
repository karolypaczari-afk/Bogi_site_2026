import { GoogleGenAI } from "@google/genai";

// Helper to get a fresh client instance
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function generateText(prompt: string, useThinking: boolean): Promise<string> {
  const ai = getAIClient();
  const model = useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  const config: any = {};
  if (useThinking) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    throw error;
  }
}

export async function generateImage(prompt: string, size: '1K' | '2K' | '4K'): Promise<string> {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: '1:1',
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
}

export async function editImage(prompt: string, imageBase64: string, mimeType: string): Promise<string> {
  const ai = getAIClient();
  // Ensure we just have the base64 data, stripping the data URL prefix if it exists
  const base64Data = imageBase64.split(',')[1] || imageBase64;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          { text: prompt },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image returned");
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
}
