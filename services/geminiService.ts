
import { GoogleGenAI, Type } from "@google/genai";
import { Car, DIYFix } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const CAR_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    make: { type: Type.STRING },
    model: { type: Type.STRING },
    year: { type: Type.NUMBER },
    category: { type: Type.STRING },
    marketPrice: { type: Type.NUMBER },
    currency: { type: Type.STRING },
    licenseRequired: { type: Type.STRING },
    description: { type: Type.STRING },
    diyFixes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          problem: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          toolsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["problem", "difficulty", "toolsNeeded", "steps"]
      }
    }
  },
  required: ["make", "model", "year", "category", "marketPrice", "currency", "licenseRequired", "description", "diyFixes"]
};

export const fetchCarDetails = async (query: string): Promise<Car> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide detailed information about the car: ${query}. Include market price, license requirements (standard global classes), and 3 common problems that can be fixed at home.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: CAR_SCHEMA
    }
  });

  const result = JSON.parse(response.text);
  return {
    ...result,
    id: `${result.make}-${result.model}-${result.year}`.toLowerCase().replace(/\s+/g, '-'),
    imageUrl: `https://picsum.photos/seed/${result.make}${result.model}/800/600`
  };
};

export const fetchFeaturedCars = async (): Promise<Car[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `List 6 diverse and popular cars currently in the global market. Include a mix of SUVs, Sedans, and Electric vehicles.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: CAR_SCHEMA
      }
    }
  });

  const results = JSON.parse(response.text);
  return results.map((result: any) => ({
    ...result,
    id: `${result.make}-${result.model}-${result.year}`.toLowerCase().replace(/\s+/g, '-'),
    imageUrl: `https://picsum.photos/seed/${result.make}${result.model}/800/600`
  }));
};
