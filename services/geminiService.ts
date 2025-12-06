import { GoogleGenAI } from "@google/genai";
import { MODEL_NAME } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWallpaperImage = async (prompt: string, styleModifier: string): Promise<string> => {
  try {
    const fullPrompt = `${styleModifier}, ${prompt}. vertical aspect ratio 9:16, mobile phone wallpaper, high quality, 4k resolution, aesthetics, beautiful composition.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        }
      },
    });

    // Iterate through parts to find the image data
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          // Determine mime type, default to png if not specified (though API usually returns mimeType)
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    throw new Error("이미지를 생성하지 못했습니다. 다시 시도해주세요.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
