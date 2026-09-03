import { ChatOpenAI } from '@langchain/openai';

// Initialize the OpenAI LLM
export const llm = new ChatOpenAI({
  modelName: 'gpt-4o', // using a capable model for coding
  temperature: 0.1,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
