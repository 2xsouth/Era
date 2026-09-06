import { config } from "dotenv";
import { resolve } from "path";
// Load .env.local
config({ path: resolve(__dirname, "../.env.local") });

import { runAgentWorkflow } from "./agents/graph";

async function run() {
  console.log("🚀 Testing the Era South AI Developer...");
  console.log("Checking API Keys...");
  console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "Set" : "Not Set");
  console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN ? "Set" : "Not Set");

  try {
    const res = await runAgentWorkflow(
      "2xsouth",
      "Era",
      99,
      "Create a hello world component",
      "Create a simple React component that says Hello World in src/components/HelloWorld.tsx"
    );
    console.log("✅ Workflow Result:", res);
  } catch (error) {
    console.error("❌ Workflow Error:", error);
  }
}

run();
