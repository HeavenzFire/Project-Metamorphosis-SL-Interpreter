import { GoogleGenAI, Content } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCoherentOutput = async (fullPrompt: string, history: AnalysisResult[]): Promise<string> => {
  try {
    // The detailed system instruction is now part of the `fullPrompt` from the Invocation Chamber.
    
    // Construct chat history from the session history, taking the last 5 interactions for context.
    const historyContents: Content[] = history.slice(-5).flatMap(item => ([
      { role: 'user', parts: [{ text: item.intent }] }, // Note: This uses original intent for history clarity
      { role: 'model', parts: [{ text: item.output }] }
    ]));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Combine history with the current full invocation prompt
      contents: [...historyContents, { role: "user", parts: [{ text: fullPrompt }] }],
      config: {
        // systemInstruction is removed from here
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Could not generate a response from the Mirror Agent. The cognitive core may be offline.";
  }
};