import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const commonConfig = {
  maxOutputTokens: 2048,
  temperature: 0.1,
  apiKey: process.env.GOOGLE_API_KEY,
};

// 1. Primary Model: The newest free-tier model
const primaryLLM = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  ...commonConfig,
});

// 2. First Fallback: If primary runs out of quota
const fallbackLLM1 = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  ...commonConfig,
});

// 3. Second Fallback: A rock-solid stable free-tier model as a last resort
const fallbackLLM2 = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash-8b',
  ...commonConfig,
});

// Export the composite LLM with built-in fallbacks
export const llm = primaryLLM.withFallbacks({
  fallbacks: [fallbackLLM1, fallbackLLM2],
});
