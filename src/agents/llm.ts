import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

// Initialize the Google Gemini LLM
export const llm = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.5-flash', // You can also use gemini-2.5-pro
  maxOutputTokens: 2048,
  temperature: 0.1,
  apiKey: process.env.GOOGLE_API_KEY,
});
