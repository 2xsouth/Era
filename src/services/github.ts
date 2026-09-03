import { Octokit } from '@octokit/rest';

// Initialize Octokit with the Personal Access Token
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Fetches the issue details from a repository
 */
export async function getIssueDetails(owner: string, repo: string, issueNumber: number) {
  const { data } = await octokit.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  });
  return data;
}

/**
 * Fetches the contents of a specific file from a repository
 */
export async function getFileContent(owner: string, repo: string, path: string, ref?: string) {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref,
  });

  if (!Array.isArray(data) && data.type === 'file' && 'content' in data) {
    return Buffer.from(data.content, 'base64').toString('utf8');
  }
  
  throw new Error('Path is not a file or does not exist');
}

/**
 * Creates a new branch from a base branch (usually main or master)
 */
export async function createBranch(owner: string, repo: string, branchName: string, baseBranch = 'main') {
  // Get the SHA of the base branch
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });

  // Create a new reference (branch)
  const { data: newRef } = await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: refData.object.sha,
  });

  return newRef;
}

/**
 * Commits multiple files to a specific branch
 */
export async function commitFiles(
  owner: string,
  repo: string,
  branchName: string,
  message: string,
  files: { path: string; content: string }[]
) {
  // 1. Get the current commit of the branch
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branchName}`,
  });
  const commitSha = refData.object.sha;

  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: commitSha,
  });
  const baseTreeSha = commitData.tree.sha;

  // 2. Create blobs for all files and build the tree
  const tree = await Promise.all(
    files.map(async (file) => {
      const { data: blobData } = await octokit.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: 'utf-8',
      });
      return {
        path: file.path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: blobData.sha,
      };
    })
  );

  // 3. Create a new tree
  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree,
  });

  // 4. Create a new commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.sha,
    parents: [commitSha],
  });

  // 5. Update the reference to point to the new commit
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branchName}`,
    sha: newCommit.sha,
  });

  return newCommit;
}

/**
 * Creates a Pull Request
 */
export async function createPullRequest(
  owner: string,
  repo: string,
  title: string,
  body: string,
  head: string,
  base: string = 'main'
) {
  const { data } = await octokit.pulls.create({
    owner,
    repo,
    title,
    body,
    head,
    base,
  });
  return data;
}
