import { StateGraph, END, START } from '@langchain/langgraph';
import { GraphState, State } from './state';
import { llm } from './llm';
import { getFileContent, createBranch, commitFiles, createPullRequest } from '../services/github';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

// 1. Planner Node
async function plannerNode(state: State): Promise<Partial<State>> {
  console.log('--- PLANNER ---');
  
  const prompt = `You are a Senior AI Software Engineer. 
You are tasked with resolving the following GitHub Issue:
Title: ${state.issueTitle}
Body: ${state.issueBody}

Based on this issue, output a JSON object containing a "plan" (string) and "filesToModify" (array of strings). 
Assume the codebase is a standard Next.js project. If you are unsure of exact paths, guess the most likely paths (e.g., "src/app/page.tsx", "package.json").
Return ONLY valid JSON.`;

  const response = await llm.invoke([new HumanMessage(prompt)]);
  
  try {
    const content = typeof response.content === 'string' ? response.content : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return { filesToModify: parsed.filesToModify || [] };
    }
  } catch (e) {
    console.error('Failed to parse planner output:', e);
  }
  
  return { filesToModify: ['src/app/page.tsx'] }; // Fallback
}

// 2. Fetch Context Node
async function fetchContextNode(state: State): Promise<Partial<State>> {
  console.log('--- FETCH CONTEXT ---');
  const fileContents: Record<string, string> = {};
  
  for (const filePath of state.filesToModify) {
    try {
      const content = await getFileContent(state.owner, state.repo, filePath);
      fileContents[filePath] = content;
    } catch (e) {
      console.warn(`Could not fetch file: ${filePath}`);
      // File might not exist yet
      fileContents[filePath] = ''; 
    }
  }
  
  return { fileContents };
}

// 3. Coder Node
async function coderNode(state: State): Promise<Partial<State>> {
  console.log('--- CODER ---');
  
  const proposedChanges: Record<string, string> = {};
  
  for (const filePath of state.filesToModify) {
    const currentContent = state.fileContents[filePath];
    
    const prompt = `You are a Senior AI Software Engineer.
Your task is to implement the changes required to fix this issue:
Title: ${state.issueTitle}
Body: ${state.issueBody}

File to modify: ${filePath}
Current Content:
\`\`\`
${currentContent}
\`\`\`

If there is review feedback, please address it:
${state.reviewFeedback}

Please provide the FULL completely rewritten file content with the fixes applied.
Do not wrap it in markdown code blocks if you can, or if you do, I will strip them.
OUTPUT ONLY THE FILE CONTENT.`;

    const response = await llm.invoke([new HumanMessage(prompt)]);
    let newContent = typeof response.content === 'string' ? response.content : '';
    
    // Strip markdown formatting if present
    if (newContent.startsWith('```')) {
      const lines = newContent.split('\n');
      lines.shift(); // remove first ```
      if (lines[lines.length - 1].startsWith('```')) {
        lines.pop();
      }
      newContent = lines.join('\n');
    }
    
    proposedChanges[filePath] = newContent;
  }
  
  return { proposedChanges };
}

// 4. Reviewer Node
async function reviewerNode(state: State): Promise<Partial<State>> {
  console.log('--- REVIEWER ---');
  // Simple check: do we have empty files?
  for (const [path, content] of Object.entries(state.proposedChanges)) {
    if (!content || content.trim() === '') {
      return { reviewFeedback: `File ${path} is empty. Please provide actual content.` };
    }
  }
  
  return { reviewFeedback: 'APPROVED' }; // Or we can use LLM to review
}

// 5. PR Creator Node
async function createPrNode(state: State): Promise<Partial<State>> {
  console.log('--- CREATE PR ---');
  const branchName = `ai-fix-issue-${state.issueNumber}-${Date.now()}`;
  
  try {
    // 1. Create a new branch
    await createBranch(state.owner, state.repo, branchName);
    
    // 2. Commit the changes
    const filesArray = Object.entries(state.proposedChanges).map(([path, content]) => ({ path, content }));
    await commitFiles(state.owner, state.repo, branchName, `Fix issue #${state.issueNumber}: ${state.issueTitle}`, filesArray);
    
    // 3. Create PR
    const pr = await createPullRequest(
      state.owner,
      state.repo,
      `Fix: ${state.issueTitle}`,
      `This PR was generated automatically by Era South AI Developer to fix issue #${state.issueNumber}.`,
      branchName
    );
    
    return { prUrl: pr.html_url };
  } catch (error: any) {
    console.error('Error creating PR:', error);
    return { error: error.message };
  }
}

// Define the Routing Logic
function shouldCreatePr(state: State) {
  if (state.reviewFeedback === 'APPROVED') {
    return 'createPrNode';
  }
  return 'coderNode'; // Needs revision
}

// Build the LangGraph
const workflow = new StateGraph(GraphState)
  .addNode('plannerNode', plannerNode)
  .addNode('fetchContextNode', fetchContextNode)
  .addNode('coderNode', coderNode)
  .addNode('reviewerNode', reviewerNode)
  .addNode('createPrNode', createPrNode)
  .addEdge(START, 'plannerNode')
  .addEdge('plannerNode', 'fetchContextNode')
  .addEdge('fetchContextNode', 'coderNode')
  .addEdge('coderNode', 'reviewerNode')
  .addConditionalEdges('reviewerNode', shouldCreatePr, {
    createPrNode: 'createPrNode',
    coderNode: 'coderNode'
  })
  .addEdge('createPrNode', END);

// Compile the graph
export const agentGraph = workflow.compile();

/**
 * Helper to run the graph
 */
export async function runAgentWorkflow(owner: string, repo: string, issueNumber: number, title: string, body: string) {
  const initialState = {
    owner,
    repo,
    issueNumber,
    issueTitle: title,
    issueBody: body,
  };
  
  const result = await agentGraph.invoke(initialState);
  console.log('Workflow complete. PR URL:', result.prUrl);
  return result;
}
