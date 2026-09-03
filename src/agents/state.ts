import { Annotation } from '@langchain/langgraph';

// Define the state for the LangGraph state machine
export const GraphState = Annotation.Root({
  owner: Annotation<string>(),
  repo: Annotation<string>(),
  issueNumber: Annotation<number>(),
  issueTitle: Annotation<string>(),
  issueBody: Annotation<string>(),
  
  // The files that the planner decides to modify
  filesToModify: Annotation<string[]>({
    reducer: (curr, next) => next,
    default: () => [],
  }),
  
  // Current file contents
  fileContents: Annotation<Record<string, string>>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  
  // Proposed modifications (new contents)
  proposedChanges: Annotation<Record<string, string>>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  
  // Reviewer feedback
  reviewFeedback: Annotation<string>({
    reducer: (curr, next) => next,
    default: () => '',
  }),
  
  // PR url
  prUrl: Annotation<string>({
    reducer: (curr, next) => next,
    default: () => '',
  }),
  
  // Error state
  error: Annotation<string>({
    reducer: (curr, next) => next,
    default: () => '',
  }),
});

export type State = typeof GraphState.State;
