import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const commonConfig = {
  maxOutputTokens: 2048,
  temperature: 0.1,
  apiKey: process.env.GOOGLE_API_KEY,
};

// 1. Primary Model: The newest free-tier model
const primaryLLM = new ChatGoogleGenerativeAI({
  model: 'gemini-3.7-flash',
  ...commonConfig,
});

// 2. First Fallback: If 3.7 runs out of quota, use 3.8-flash
const fallbackLLM1 = new ChatGoogleGenerativeAI({
  model: 'gemini-3.8-flash',
  ...commonConfig,
});

// 3. Second Fallback: A rock-solid stable free-tier model as a last resort
const fallbackLLM2 = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  ...commonConfig,
});

// Export the composite LLM with built-in fallbacks
export const llm = primaryLLM.withFallbacks({
  fallbacks: [fallbackLLM1, fallbackLLM2],
});
